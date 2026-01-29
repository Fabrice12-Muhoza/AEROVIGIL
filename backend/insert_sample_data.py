#!/usr/bin/env python3
"""
Simple script to insert sample data into MongoDB - FIXED VERSION
"""
import asyncio
import motor.motor_asyncio
from datetime import datetime, timedelta
import random
import hashlib
import uuid
import sys

# MongoDB connection
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
db = client.aerovigil

# Simple password hashing function
def hash_password(password: str) -> str:
    """Simple password hashing using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()

async def create_sample_data():
    print("Creating sample data for AEROVIGIL...")
    print("-" * 50)
    
    try:
        # Clear existing collections
        await db.users.delete_many({})
        await db.alerts.delete_many({})
        await db.vehicles.delete_many({})
        await db.evidence.delete_many({})
        print("✓ Cleared existing data")
        
        # 1. Create Users
        users = [
            {
                "_id": str(uuid.uuid4()),
                "email": "admin@aerovigil.com",
                "full_name": "System Administrator",
                "password_hash": hash_password("admin123"),
                "role": "admin",
                "is_active": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "email": "operator@aerovigil.com",
                "full_name": "Traffic Operator",
                "password_hash": hash_password("operator123"),
                "role": "operator",
                "is_active": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "email": "viewer@aerovigil.com",
                "full_name": "Report Viewer",
                "password_hash": hash_password("viewer123"),
                "role": "viewer",
                "is_active": True,
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.users.insert_many(users)
        print(f"✓ Created {len(users)} users")
        
        # 2. Create Vehicles
        vehicles = []
        for i in range(1, 21):
            letter1 = chr(65 + ((i-1) % 26))
            letter2 = chr(66 + ((i-1) % 26))
            plate = f"RA{letter1}{letter2}{random.randint(100, 999)}"
            
            vehicle = {
                "_id": str(uuid.uuid4()),
                "vehicle_id": f"V{i:03d}",
                "plate_number": plate,
                "make": random.choice(["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi"]),
                "model": random.choice(["Camry", "Civic", "Focus", "X5", "C-Class", "A4"]),
                "color": random.choice(["Red", "Blue", "Black", "White", "Silver", "Gray"]),
                "owner_info": {
                    "name": f"Owner {i}",
                    "contact": f"+1-555-{random.randint(100, 999)}-{random.randint(1000, 9999)}"
                },
                "created_at": datetime.utcnow()
            }
            vehicles.append(vehicle)
        
        await db.vehicles.insert_many(vehicles)
        print(f"✓ Created {len(vehicles)} vehicles")
        
        # 3. Create Alerts (from PDF)
        alerts = []
        
        # Specific alerts from PDF
        specific_alerts = [
            {
                "_id": str(uuid.uuid4()),
                "alert_id": "305",
                "vehicle_id": "V101",
                "plate": "RAB123",
                "violation_type": "MOVING",
                "status": "ACTIVE",
                "timestamp": "2026-01-06 08:12:45",
                "hash": "af23d4f67bc...",
                "camera_id": "CAM-001",
                "location": "Intersection A",
                "confidence": 0.95,
                "created_at": datetime(2026, 1, 6, 8, 12, 45)
            },
            {
                "_id": str(uuid.uuid4()),
                "alert_id": "304",
                "vehicle_id": "V102",
                "plate": "RACS67",
                "violation_type": "STOPPED",
                "status": "ACTIVE",
                "timestamp": "2026-01-06 08:10:30",
                "hash": "be78d9e45cc...",
                "camera_id": "CAM-002",
                "location": "Highway B",
                "confidence": 0.87,
                "created_at": datetime(2026, 1, 6, 8, 10, 30)
            }
        ]
        
        alerts.extend(specific_alerts)
        
        # Add more random alerts
        for i in range(20):
            vehicle = random.choice(vehicles)
            alert = {
                "_id": str(uuid.uuid4()),
                "alert_id": f"{300 - i}",
                "vehicle_id": vehicle["vehicle_id"],
                "plate": vehicle["plate_number"],
                "violation_type": random.choice(["MOVING", "STOPPED", "SPEEDING", "RED_LIGHT"]),
                "status": random.choice(["ACTIVE", "RESOLVED", "PENDING"]),
                "timestamp": (datetime.utcnow() - timedelta(hours=random.randint(1, 24))).strftime("%Y-%m-%d %H:%M:%S"),
                "hash": ''.join(random.choices('abcdef0123456789', k=12)) + "...",
                "camera_id": f"CAM-{random.randint(1, 4):03d}",
                "location": random.choice(["Main Street", "Highway", "Intersection", "Bridge"]),
                "confidence": round(random.uniform(0.7, 0.99), 2),
                "created_at": datetime.utcnow() - timedelta(hours=random.randint(1, 24))
            }
            alerts.append(alert)
        
        await db.alerts.insert_many(alerts)
        print(f"✓ Created {len(alerts)} alerts")
        
        # 4. Create Evidence
        evidence_list = [
            {
                "_id": str(uuid.uuid4()),
                "evidence_id": "EV001",
                "vehicle_id": "V101",
                "plate": "RAB123",
                "timestamp": "2026-01-06 08:12:45",
                "hash": "af23d4f67bc...",
                "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "thumbnail_url": "https://via.placeholder.com/300x150/3b82f6/ffffff?text=RAB123",
                "status": "PROCESSED",
                "duration": 45,
                "size_mb": 12.4,
                "created_at": datetime(2026, 1, 6, 8, 12, 45)
            },
            {
                "_id": str(uuid.uuid4()),
                "evidence_id": "EV002",
                "vehicle_id": "V102",
                "plate": "RACS67",
                "timestamp": "2026-01-06 08:10:30",
                "hash": "be78d9e45cc...",
                "video_url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                "thumbnail_url": "https://via.placeholder.com/300x150/ef4444/ffffff?text=RACS67",
                "status": "PROCESSED",
                "duration": 32,
                "size_mb": 8.7,
                "created_at": datetime(2026, 1, 6, 8, 10, 30)
            }
        ]
        
        await db.evidence.insert_many(evidence_list)
        print(f"✓ Created {len(evidence_list)} evidence records")
        
        # 5. Create Cameras
        cameras = [
            {
                "_id": str(uuid.uuid4()),
                "camera_id": "CAM-001",
                "name": "Main Intersection A",
                "location": {
                    "latitude": 40.7128,
                    "longitude": -74.0060,
                    "address": "123 Main Street"
                },
                "status": "ACTIVE",
                "last_active": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "camera_id": "CAM-002",
                "name": "Highway B",
                "location": {
                    "latitude": 40.7589,
                    "longitude": -73.9851,
                    "address": "456 Highway Road"
                },
                "status": "ACTIVE",
                "last_active": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "camera_id": "CAM-003",
                "name": "Street C",
                "location": {
                    "latitude": 40.7505,
                    "longitude": -73.9934,
                    "address": "789 Park Avenue"
                },
                "status": "ACTIVE",
                "last_active": datetime.utcnow(),
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "camera_id": "CAM-004",
                "name": "Bridge D",
                "location": {
                    "latitude": 40.6892,
                    "longitude": -74.0445,
                    "address": "101 Bridge Street"
                },
                "status": "MAINTENANCE",
                "last_active": datetime.utcnow() - timedelta(hours=2),
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.cameras.insert_many(cameras)
        print(f"✓ Created {len(cameras)} cameras")
        
        # Create indexes
        await db.users.create_index("email", unique=True)
        await db.alerts.create_index("timestamp")
        await db.vehicles.create_index("plate_number", unique=True)
        await db.cameras.create_index("camera_id", unique=True)
        print("✓ Created database indexes")
        
        print("\n" + "="*60)
        print("✅ SAMPLE DATA CREATION SUCCESSFUL!")
        print("="*60)
        print("\n📊 Database Summary:")
        print(f"   Users: {len(users)}")
        print(f"   Vehicles: {len(vehicles)}")
        print(f"   Alerts: {len(alerts)}")
        print(f"   Evidence: {len(evidence_list)}")
        print(f"   Cameras: {len(cameras)}")
        
        print("\n🔑 Login Credentials:")
        print("   1. Admin:      admin@aerovigil.com / admin123")
        print("   2. Operator:   operator@aerovigil.com / operator123")
        print("   3. Viewer:     viewer@aerovigil.com / viewer123")
        
        print("\n🌐 Access URLs:")
        print("   Frontend:     http://localhost:3000")
        print("   Backend API:  http://localhost:8000")
        print("   API Docs:     http://localhost:8000/docs")
        
        print("\n🎯 Key Endpoints:")
        print("   GET /api/alerts/live     - Live alerts")
        print("   GET /api/alerts/recent   - Recent violations")
        print("   GET /api/stats           - System statistics")
        print("   GET /api/evidence/{id}   - Vehicle evidence")
        
        print("\n🚀 Ready to start! Run: python main.py")
        print("="*60)
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Make sure MongoDB is running: mongod")
        sys.exit(1)

if __name__ == "__main__":
    # Check if MongoDB is running
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(create_sample_data())
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure MongoDB is installed and running")
        print("2. Start MongoDB: mongod (or start MongoDB service)")
        print("3. Check connection: mongodb://localhost:27017")