from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import user, credit

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your NextJS frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(credit.router, prefix="/credits", tags=["credits"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
