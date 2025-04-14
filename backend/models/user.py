from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    fname = Column(String(50), nullable=False)
    lname = Column(String(50), nullable=False)
    contact = Column(String(20), unique=True, index=True)
    password = Column(String(255), nullable=False)

    # Define the relationship to TaxForm
    tax_forms = relationship("TaxForm", back_populates="user", cascade="all, delete-orphan")
