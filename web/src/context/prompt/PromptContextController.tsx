"use client";

import React, { useEffect, useState } from "react";

import { PromptContext } from "./PromptContext";
import {
  CreatePromptFormSchema,
  PromptContextControllerActions,
  PromptContextControllerProps,
  PromptContextType,
} from "./PromptContext.types";
import { TextToImgService } from "@/lib/api-client/services/TextToImgService";
import { AiModelsTextToImgResponse } from "@/lib/api-client/models/TextToImg";
import { SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { PromptsService } from "@/lib/api-client/services/PromptsService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoundContext } from "../round/useRoundContext";

export const PromptContextController = ({ children }: PromptContextControllerProps) => {
  const [textToImgModels, setTextToImgModels] = useState<AiModelsTextToImgResponse[] | []>([]);
  const [actions, setActions] = useState<PromptContextControllerActions>({
    submitPrompt: {
      isLoading: false,
    },
  });

  const { getCurrentRound, currentRound } = useRoundContext();

  const form = useForm<z.infer<typeof CreatePromptFormSchema>>({
    resolver: zodResolver(CreatePromptFormSchema),
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

      form.reset({
        prompt: "",
      });
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

  useEffect(() => {
    getCurrentRound();
  }, []);

  useEffect(() => {
    if (!currentRound) return;

    form.setValue("roundId", currentRound?.id!);
  }, [currentRound]);

  const props: PromptContextType = {
    textToImgModels,
    getTextToImgModels,
    submitPrompt,
    actions,
    form,
  };

  return <PromptContext.Provider value={props}>{children}</PromptContext.Provider>;
};
