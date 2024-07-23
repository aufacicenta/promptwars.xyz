import { useContext } from "react";

import { IlluviumPassportContext } from "./IlluviumPassportContext";

export const useIlluviumPassportContext = () => {
  const context = useContext(IlluviumPassportContext);

  if (context === undefined) {
    throw new Error("useIlluviumPassportContext must be used within a IlluviumPassportContext");
  }

  return context;
};
