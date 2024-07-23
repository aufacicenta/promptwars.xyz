from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from ..models.credit import CreditBalance, UserWallet
from ..utils.eth.account import generate_user_wallet
from pydantic import BaseModel
from typing import Optional
import uuid

router = APIRouter()


class CreditBalanceResponse(BaseModel):
    balance: float
    wallet_address: Optional[str]


@router.get("/{user_id}", response_model=CreditBalanceResponse)
def get_credit_balance(user_id: uuid.UUID, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    credit_balance = (
        db.query(CreditBalance).filter(CreditBalance.user_id == user_id).first()
    )
    if not credit_balance:
        credit_balance = CreditBalance(user_id=user_id)
        db.add(credit_balance)
        db.commit()
        db.refresh(credit_balance)

    user_wallet = db.query(UserWallet).filter(UserWallet.user_id == user_id).first()
    if not user_wallet:
        new_wallet_address = generate_user_wallet(user_id)
        user_wallet = UserWallet(user_id=user_id, wallet_address=new_wallet_address)
        db.add(user_wallet)
        db.commit()
        db.refresh(user_wallet)

    return CreditBalanceResponse(
        balance=float(credit_balance.balance), wallet_address=user_wallet.wallet_address
    )
