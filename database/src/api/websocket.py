from fastapi import WebSocket
from typing import List, Dict
from ..utils.eth.usdt_listener import (
    setup_erc20_transfer_listener,
    handle_erc20_transfer_event,
)


class WebSocketManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.usdt_listener = None

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: Dict):
        for connection in self.active_connections:
            await connection.send_json(message)

    async def run_erc20_transfer_listener(self):
        self.usdt_listener = setup_erc20_transfer_listener()
        async for event in self.usdt_listener:
            try:
                processed_event = await handle_erc20_transfer_event(event)
                if processed_event:
                    await self.broadcast(processed_event)
            except Exception as e:
                print(f"Error processing USDT event: {e}")


manager = WebSocketManager()


async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep the connection alive
            await websocket.receive_text()
    except:
        manager.disconnect(websocket)
