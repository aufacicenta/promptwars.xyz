from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import user, credit, websocket
import asyncio
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: start USDT listener
    usdt_listener_task = asyncio.create_task(
        websocket.manager.run_erc20_transfer_listener()
    )
    yield
    # Shutdown: cancel USDT listener
    usdt_listener_task.cancel()
    try:
        await usdt_listener_task
    except asyncio.CancelledError:
        pass


app = FastAPI(lifespan=lifespan)

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
app.add_websocket_route("/ws", websocket.websocket_endpoint)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
