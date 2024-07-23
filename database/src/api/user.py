from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from pydantic import BaseModel

router = APIRouter()


class UserCreate(BaseModel):
    ethereum_address: str


@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = User(ethereum_address=user.ethereum_address)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)

        return {"id": str(db_user.id), "ethereum_address": db_user.ethereum_address}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{ethereum_address}")
def get_user(ethereum_address: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.ethereum_address == ethereum_address).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return {"id": str(user.id), "ethereum_address": user.ethereum_address}
