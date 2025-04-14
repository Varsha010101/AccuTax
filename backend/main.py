from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user, tax_form
from database.connection import Base, engine
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include user and tax-related routes
app.include_router(user.router)
app.include_router(tax_form.router)  

# Test route to ensure backend is connected
@app.get("/")
def read_root():
    return {"message": "Backend is connected successfully "}
