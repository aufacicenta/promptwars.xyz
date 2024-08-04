import { useContext } from "react";

import { PromptContext } from "./PromptContext";

export const usePromptContext = () => {
  const context = useContext(PromptContext);

  if (context === undefined) {
    throw new Error("usePromptContext must be used within a PromptContext");
  }

  return context;
};
