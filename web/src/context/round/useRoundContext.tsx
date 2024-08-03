import { useContext } from "react";

import { RoundContext } from "./RoundContext";

export const useRoundContext = () => {
  const context = useContext(RoundContext);

  if (context === undefined) {
    throw new Error("useRoundContext must be used within a RoundContext");
  }

  return context;
};
