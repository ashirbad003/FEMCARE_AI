from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.models import FlowLevel


class UserCreate(BaseModel):
    email: str
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserOut(BaseModel):
    id: int
    email: str
    username: str
    created_at: datetime

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str


class CycleEntryCreate(BaseModel):
    date: datetime
    flow_level: Optional[FlowLevel] = None
    symptoms: Optional[str] = None
    notes: Optional[str] = None


class CycleEntryOut(BaseModel):
    id: int
    user_id: int
    date: datetime
    flow_level: Optional[FlowLevel]
    symptoms: Optional[str]
    notes: Optional[str]
    created_at: datetime

    model_config = {"from_attributes": True}


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str
