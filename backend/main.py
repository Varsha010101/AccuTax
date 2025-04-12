from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user
from database.connection import Base, engine
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Create database tables (ensure that the database is running)
Base.metadata.create_all(bind=engine)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust the port if different
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the user-related routes (signup, login)
app.include_router(user.router)

# Test route to ensure backend is connected
@app.get("/")
def read_root():
    return {"message": "Backend is connected successfully 🎉"}
