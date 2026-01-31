# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.mongo import connect_to_mongo
from app.auth.routes import router as auth_router
from app.routes.alerts import router as alerts_router

app = FastAPI(
    title="AEROVIGIL API",
    version="3.0.0",
    description="Rwanda National Police Violation Detection Backend"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router, prefix="/api/auth")
app.include_router(alerts_router, prefix="/api/alerts")


@app.get("/")
async def root():
    return {"status": "🚔 AEROVIGIL backend running"}


@app.on_event("startup")
async def startup():
    try:
        await connect_to_mongo()
    except Exception as e:
        print(f"Warning: Database connection failed: {e}")
        print("App will continue without database connection")
