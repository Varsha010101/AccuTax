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

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://accutax.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(user.router)
app.include_router(tax_form.router)

# Test route
@app.get("/")
def read_root():
    return {"message": "Backend is connected successfully"}

# For local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
