from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User, ChatHistory
from app.schemas.schemas import ChatRequest, ChatResponse
from app.core.security import get_current_user
from app.sevices.ai_service import get_ai_reply

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest, db: Session = Depends(get_db),
         current_user: User = Depends(get_current_user)):
    history = db.query(ChatHistory).filter(
        ChatHistory.user_id == current_user.id
    ).order_by(ChatHistory.created_at.asc()).limit(20).all()

    messages = [{"role": h.role, "content": h.content} for h in history]
    messages.append({"role": "user", "content": payload.message})

    db.add(ChatHistory(user_id=current_user.id, role="user", content=payload.message))
    reply = get_ai_reply(messages)
    db.add(ChatHistory(user_id=current_user.id, role="assistant", content=reply))
    db.commit()
    return ChatResponse(reply=reply)
