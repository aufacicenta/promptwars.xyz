import { useContext } from "react";

import { WebsocketsContext } from "./WebsocketsContext";

export const useWebsocketsContext = () => {
  const context = useContext(WebsocketsContext);

  if (context === undefined) {
    throw new Error("useWebsocketsContext must be used within a WebsocketsContext");
  }

  return context;
};
