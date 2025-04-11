# main.py (inside backend/)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user
from database.connection import Base, engine
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend domain if deployed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# ✅ Include signup and login routes
app.include_router(user.router)

# ✅ Test route
@app.get("/")
def read_root():
    return {"message": "Backend is connected successfully 🎉"}
