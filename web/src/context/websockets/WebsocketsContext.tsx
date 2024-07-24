import { createContext } from "react";

import { WebsocketsContextType } from "./WebsocketsContext.types";

export const WebsocketsContext = createContext<WebsocketsContextType | undefined>(undefined);
