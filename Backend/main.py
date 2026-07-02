from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import auth, cycle, ai
from app.database import engine, Base

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FeMCaRe AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(cycle.router)
app.include_router(ai.router)

@app.get("/")
def root():
    return {"message": "FeMCaRe AI Backend is Running"}