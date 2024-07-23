import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from ..database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ethereum_address = Column(String(42), unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
    credit_balance = relationship("CreditBalance", back_populates="user", uselist=False)
    wallet = relationship("UserWallet", back_populates="user", uselist=False)

    def __repr__(self):
        return f"<User(id={self.id}, ethereum_address={self.ethereum_address})>"
