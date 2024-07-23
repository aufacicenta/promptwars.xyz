import { useContext } from "react";

import { UserCreditsContext } from "./UserCreditsContext";

export const useUserCreditsContext = () => {
  const context = useContext(UserCreditsContext);

  if (context === undefined) {
    throw new Error("useUserCreditsContext must be used within a UserCreditsContext");
  }

  return context;
};
