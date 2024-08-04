"use client";

import React, { useState } from "react";

import { PromptContext } from "./PromptContext";
import { PromptContextControllerActions, PromptContextControllerProps, PromptContextType } from "./PromptContext.types";
import { TextToImgService } from "@/lib/api-client/services/TextToImgService";
import { AiModelsTextToImgResponse } from "@/lib/api-client/models/TextToImg";
import { SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { PromptsService } from "@/lib/api-client/services/PromptsService";

export const PromptContextController = ({ children }: PromptContextControllerProps) => {
  const [textToImgModels, setTextToImgModels] = useState<AiModelsTextToImgResponse[] | []>([]);
  const [actions, setActions] = useState<PromptContextControllerActions>({
    submitPrompt: {
      isLoading: false,
    },
  });

  async function getTextToImgModels() {
    try {
      const result = await TextToImgService.getTextToImgModels();
      setTextToImgModels(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function submitPrompt(data: SubmitPromptRequest) {
    setActions((prev) => ({
      ...prev,
      submitPrompt: {
        isLoading: true,
      },
    }));

    try {
      const result = await PromptsService.submitPrompt(data);
      console.log({ result });
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      submitPrompt: {
        isLoading: false,
      },
    }));
  }

  const props: PromptContextType = {
    textToImgModels,
    getTextToImgModels,
    submitPrompt,
    actions,
  };

  return <PromptContext.Provider value={props}>{children}</PromptContext.Provider>;
};
