import { createContext } from "react";

import { UserCreditsContextType } from "./UserCreditsContext.types";

export const UserCreditsContext = createContext<UserCreditsContextType | undefined>(undefined);
