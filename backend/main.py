# main.py (inside backend/)

from fastapi import FastAPI
from routers import user  # ✅ Relative import
from database.connection import Base, engine  # ✅ Relative import
from dotenv import load_dotenv

# Load .env variables (like SECRET_KEY)
load_dotenv()

app = FastAPI()

# Create all tables
Base.metadata.create_all(bind=engine)

# Include user-related routes (signup, login)
app.include_router(user.router)

# Test route
@app.get("/")
def read_root():
    return {"message": "Backend is connected successfully 🎉"}
