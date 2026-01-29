# app/models.py
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from enum import Enum

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class ViolationType(str, Enum):
    MOVING = "moving"
    STOPPED = "stopped"
    SPEEDING = "speeding"
    RED_LIGHT = "red_light"
    NO_HELMET = "no_helmet"

class UserRole(str, Enum):
    ADMIN = "admin"
    OPERATOR = "operator"
    VIEWER = "viewer"

class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    password_hash: str
    full_name: str
    role: UserRole = UserRole.VIEWER
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Vehicle(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    vehicle_id: str
    plate_number: str
    make: Optional[str] = None
    model: Optional[str] = None
    color: Optional[str] = None
    owner_info: Optional[dict] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Alert(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    vehicle_id: str
    plate_number: str
    violation_type: ViolationType
    confidence: float = Field(..., ge=0, le=1)
    location: dict
    timestamp: datetime
    camera_id: str
    status: str = "pending"  # pending, reviewed, resolved
    evidence_urls: List[str] = []
    metadata: dict = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Evidence(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    alert_id: PyObjectId
    vehicle_id: str
    video_url: str
    thumbnail_url: str
    hash: str  # SHA-256 hash for integrity
    timestamp: datetime
    duration: float  # in seconds
    processed: bool = False
    analysis_results: dict = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Camera(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    camera_id: str
    location: dict
    status: str = "active"  # active, inactive, maintenance
    stream_url: Optional[str] = None
    last_ping: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)