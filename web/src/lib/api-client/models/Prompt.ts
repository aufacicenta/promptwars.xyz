import { FormSchema } from "@/components/promptwars/home/Home.types";
import { Prompt, PromptAttributes } from "@promptwars/database/models/Prompt";
import { z } from "zod";

export type SubmitPromptRequest = z.infer<typeof FormSchema> & {
  roundId: PromptAttributes["round_id"];
};

export type SubmitPromptResponse = PromptAttributes;
