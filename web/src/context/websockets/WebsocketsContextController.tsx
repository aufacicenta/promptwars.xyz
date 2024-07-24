"use client";

import React from "react";

import { WebsocketsContext } from "./WebsocketsContext";
import { WebsocketsContextControllerProps, WebsocketsContextType } from "./WebsocketsContext.types";
import { apiOriginWS } from "@/hooks/useRoutes/useRoutes";

let socket: WebSocket | null = null;

export const WebsocketsContextController = ({ children }: WebsocketsContextControllerProps) => {
  function connectWebSocket(onMessage: (data: any) => void) {
    console.log("[WebsocketsContextController.connectWebSocket]: called");

    if (socket) {
      socket.close();
    }

    socket = new WebSocket(`${apiOriginWS}/ws`);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      // Attempt to reconnect after a delay
      setTimeout(() => connectWebSocket(onMessage), 5000);
    };
  }

  function closeWebSocket() {
    if (socket) {
      socket.close();
    }
  }

  const props: WebsocketsContextType = {
    connectWebSocket,
    closeWebSocket,
  };

  return <WebsocketsContext.Provider value={props}>{children}</WebsocketsContext.Provider>;
};
