from fastapi import APIRouter

router = APIRouter(tags=["Auth"])

@router.get("/ping")
async def ping():
    return {"msg": "auth alive"}
@router.post("/login")
async def login():
    return {"msg": "login endpoint"}