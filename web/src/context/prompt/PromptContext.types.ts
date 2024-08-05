import { GetAllPromptsByRoundIdResponse, SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { AiModelsTextToImgResponse } from "@/lib/api-client/models/TextToImg";
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const CreatePromptFormSchema = z.object({
  roundId: z.string({
    required_error: "roundId cannot be empty",
  }),
  prompt: z.string({
    required_error: "Prompt cannot be empty",
  }),
  textToImgModelId: z.string({
    required_error: "Please select a model to display.",
  }),
});

export type PromptContextControllerProps = {
  children: ReactNode;
};

export type PromptContextControllerActions = {
  submitPrompt: { isLoading: boolean };
};

export type PromptContextType = {
  actions: PromptContextControllerActions;
  textToImgModels: AiModelsTextToImgResponse[];
  promptsByRoundId: GetAllPromptsByRoundIdResponse;
  form: UseFormReturn<z.infer<typeof CreatePromptFormSchema>>;
  getAllPromptsByRoundId: (_roundId: PromptAttributes["round_id"]) => Promise<void>;
  getTextToImgModels: () => Promise<void>;
  submitPrompt: (_data: SubmitPromptRequest) => Promise<void>;
};
