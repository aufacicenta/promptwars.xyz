import { createContext } from "react";

import { PromptContextType } from "./PromptContext.types";

export const PromptContext = createContext<PromptContextType | undefined>(undefined);
