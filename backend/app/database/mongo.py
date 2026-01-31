import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("aerovigil.mongo")

client = None
db = None

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB_NAME", "aerovigil")


async def connect_to_mongo():
    global client, db

    client = AsyncIOMotorClient(
        MONGO_URL,
        maxPoolSize=50,
        minPoolSize=5,
        serverSelectionTimeoutMS=5000
    )

    db = client[DB_NAME]

    await db.command("ping")

    await db.users.create_index("email", unique=True)
    await db.vehicles.create_index("plate_number", unique=True)
    await db.violations.create_index("plate_number")
    await db.violations.create_index("timestamp")
    await db.violations.create_index("status")
    await db.alerts.create_index("timestamp")
    await db.evidence.create_index("file_hash")

    logger.info("MongoDB connected")


def get_db():
    return db


async def close_mongo_connection():
    global client
    if client:
        client.close()
        logger.info("MongoDB closed")
        client = None
        db = None       