from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from models.user import User
from passlib.context import CryptContext
from pydantic import BaseModel
import jwt
import os
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("SECRET_KEY", "secret")

# OAuth2PasswordBearer will look for the token in the request header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic schemas
class UserCreate(BaseModel):
    fname: str
    lname: str
    contact: str
    password: str

class UserLogin(BaseModel):
    fname: str  # Changed from 'contact' to 'fname'
    password: str

# Signup route
@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.contact == user.contact).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)
    new_user = User(
        fname=user.fname,
        lname=user.lname,
        contact=user.contact,
        password=hashed_password,
        isverified=False
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

# Login route (modified to use 'fname' for authentication)
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.fname == user.fname).first()  # Checking with 'fname'
    
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Verify password
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # JWT Token generation
    token_data = {"id": db_user.id, "fname": db_user.fname}
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    
    # Returning the token to the frontend
    return {"access_token": token, "token_type": "bearer"}

# Protect routes with OAuth2 and get current user
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        # Decode the token and return user info
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload  # You can extract more user info if needed
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
