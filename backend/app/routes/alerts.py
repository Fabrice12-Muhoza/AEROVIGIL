# app/routes/alerts.py
from fastapi import APIRouter, Depends, HTTPException, Query, WebSocket
from datetime import datetime, timedelta
from typing import List, Optional
import redis

from app.models import Alert, Violation, User
from app.auth import get_current_user
from app.database import db

router = APIRouter()

@router.get("/live", response_model=List[Alert])
async def get_live_alerts(
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_user)
):
    alerts = await db.alerts.find(
        {"timestamp": {"$gte": datetime.utcnow() - timedelta(hours=24)}}
    ).sort("timestamp", -1).skip(skip).limit(limit).to_list(length=limit)
    
    return [Alert(**alert) for alert in alerts]

@router.post("/", response_model=Alert)
async def create_alert(alert: Alert, current_user: User = Depends(get_current_user)):
    # Check for duplicate
    existing = await db.alerts.find_one({
        "vehicle_id": alert.vehicle_id,
        "timestamp": {"$gte": alert.timestamp - timedelta(seconds=10)}
    })
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Duplicate alert detected"
        )
    
    result = await db.alerts.insert_one(alert.dict(by_alias=True))
    alert.id = result.inserted_id
    
    # Publish to Redis for real-time updates
    redis_client.publish("alerts", json.dumps({
        "type": "new_alert",
        "alert": alert.dict()
    }))
    
    return alert

@router.get("/stats")
async def get_alerts_stats(current_user: User = Depends(get_current_user)):
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    
    total_alerts = await db.alerts.count_documents({})
    today_violations = await db.alerts.count_documents({
        "timestamp": {"$gte": today_start}
    })
    active_cameras = await db.cameras.count_documents({"status": "active"})
    
    return {
        "total_alerts": total_alerts,
        "today_violations": today_violations,
        "active_cameras": active_cameras,
        "violations_by_type": {
            "moving": await db.alerts.count_documents({"violation_type": "moving"}),
            "stopped": await db.alerts.count_documents({"violation_type": "stopped"}),
            "speeding": await db.alerts.count_documents({"violation_type": "speeding"}),
        }
    }