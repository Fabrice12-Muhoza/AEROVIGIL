from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
import uuid




class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    password: str
    role: str = "POLICE"   # ADMIN | POLICE | CONTROL_ROOM | COURT
    created_at: datetime = Field(default_factory=datetime.utcnow)




class Vehicle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    plate_number: str
    owner_name: str
    phone: str
    address: str
    created_at: datetime = Field(default_factory=datetime.utcnow)




class Evidence(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    image_url: Optional[str] = None
    video_url: Optional[str] = None
    file_hash: str  # SHA256
    timestamp: datetime = Field(default_factory=datetime.utcnow)




class Violation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    plate_number: str
    status: str  # MOVING | STOPPED
    location: Optional[str] = None
    evidence_id: Optional[str] = None
    officer_id: Optional[str] = None
    fine_amount: float = 0.0
    timestamp: datetime = Field(default_factory=datetime.utcnow)




class Alert(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    violation_id: str
    message: str
    read: bool = False
    timestamp: datetime = Field(default_factory=datetime.utcnow)




class DashboardStats(BaseModel):
    total_violations: int = 0
    moving: int = 0
    stopped: int = 0
    today: int = 0


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
