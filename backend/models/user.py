from sqlalchemy import Column, Integer, String, Boolean
from database.connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fname = Column(String(50), nullable=False)
    lname = Column(String(50), nullable=False)
    contact = Column(String(20), unique=True, index=True)
    password = Column(String(255), nullable=False)
    isverified = Column(Boolean, default=False)
