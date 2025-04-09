from fastapi import FastAPI
from database.connection import Base, engine

app = FastAPI()  # ← This is the important part

# Optional: If you want to create tables automatically
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Backend is connected successfully 🎉"}
