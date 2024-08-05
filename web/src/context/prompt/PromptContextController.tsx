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
import { GetAllPromptsByRoundIdResponse, SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { PromptsService } from "@/lib/api-client/services/PromptsService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRoundContext } from "../round/useRoundContext";
import { PromptAttributes } from "@promptwars/database/models/Prompt";

export const PromptContextController = ({ children }: PromptContextControllerProps) => {
  const [textToImgModels, setTextToImgModels] = useState<AiModelsTextToImgResponse[] | []>([]);
  const [promptsByRoundId, setPromptsByRoundId] = useState<GetAllPromptsByRoundIdResponse | []>([]);
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

  async function getAllPromptsByRoundId(roundId: PromptAttributes["round_id"]) {
    try {
      const result = await PromptsService.getAllByRoundId(roundId);

      setPromptsByRoundId(result);
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

      getAllPromptsByRoundId(currentRound!.id!);

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
    promptsByRoundId,
    getAllPromptsByRoundId,
  };

  return <PromptContext.Provider value={props}>{children}</PromptContext.Provider>;
};
