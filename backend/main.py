from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.ai_chat import router as ai_router
from routes.disease import router as disease_router
from routes.schemes import router as schemes_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running 🌾"}

app.include_router(ai_router)
app.include_router(disease_router)
app.include_router(schemes_router)