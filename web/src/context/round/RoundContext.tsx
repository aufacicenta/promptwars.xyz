import { createContext } from "react";

import { RoundContextType } from "./RoundContext.types";

export const RoundContext = createContext<RoundContextType | undefined>(undefined);
