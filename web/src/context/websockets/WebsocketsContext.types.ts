import { ReactNode } from "react";

export type WebsocketsContextControllerProps = {
  children: ReactNode;
};

export type WebsocketsContextType = {
  connectWebSocket: (onMessage: (data: any) => void) => void;
  closeWebSocket: () => void;
};
