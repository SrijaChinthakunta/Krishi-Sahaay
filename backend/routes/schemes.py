from fastapi import APIRouter
from data.schemes_data import schemes

router = APIRouter()

@router.get("/schemes")
def get_schemes():
    return {"available_schemes": schemes}