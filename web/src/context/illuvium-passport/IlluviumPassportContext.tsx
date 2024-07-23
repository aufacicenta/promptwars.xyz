import { createContext } from "react";

import { IlluviumPassportContextType } from "./IlluviumPassportContext.types";

export const IlluviumPassportContext = createContext<IlluviumPassportContextType | undefined>(undefined);
