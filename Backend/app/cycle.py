from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import User, CycleEntry
from app.schemas.schemas import CycleEntryCreate, CycleEntryOut
from app.core.security import get_current_user
from app.sevices.cycle_sevice import predict_next_period, get_cycle_stats

router = APIRouter(prefix="/cycle", tags=["cycle"])


@router.post("/entries", response_model=CycleEntryOut)
def create_entry(payload: CycleEntryCreate, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    entry = CycleEntry(
        user_id=current_user.id,
        date=payload.date,
        flow_level=payload.flow_level,
        symptoms=payload.symptoms,
        notes=payload.notes,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("/entries", response_model=list[CycleEntryOut])
def list_entries(db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    entries = db.query(CycleEntry).filter(
        CycleEntry.user_id == current_user.id
    ).order_by(CycleEntry.date.desc()).all()
    return entries


@router.delete("/entries/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db),
                 current_user: User = Depends(get_current_user)):
    entry = db.query(CycleEntry).filter(
        CycleEntry.id == entry_id,
        CycleEntry.user_id == current_user.id
    ).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return {"ok": True}


@router.get("/predict")
def predict(current_user: User = Depends(get_current_user),
            db: Session = Depends(get_db)):
    entries = db.query(CycleEntry).filter(
        CycleEntry.user_id == current_user.id
    ).order_by(CycleEntry.date.desc()).limit(6).all()
    prediction = predict_next_period(entries)
    stats = get_cycle_stats(entries)
    return {"prediction": prediction, "stats": stats}
