from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine

from app.api.routes import router as complaint_router
from app.api.dashboard import router as dashboard_router
from app.api.status import router as status_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Complaint Management System",
    version="1.0.0",
    description="AI-powered Customer Complaint Management using FastAPI, LangGraph, and Groq",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(complaint_router)
app.include_router(dashboard_router)
app.include_router(status_router)


@app.get("/")
def home():
    return {
        "message": "AI Complaint Management System API",
        "status": "Running",
        "version": "1.0.0",
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "database": "Connected",
        "api": "Running",
    }