import { SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { AiModelsTextToImgResponse } from "@/lib/api-client/models/TextToImg";
import { ReactNode } from "react";

export type PromptContextControllerProps = {
  children: ReactNode;
};

export type PromptContextControllerActions = {
  submitPrompt: { isLoading: boolean };
};

export type PromptContextType = {
  actions: PromptContextControllerActions;
  textToImgModels: AiModelsTextToImgResponse[];
  getTextToImgModels: () => Promise<void>;
  submitPrompt: (data: SubmitPromptRequest) => Promise<void>;
};
