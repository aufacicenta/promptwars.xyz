import { CreatePromptFormSchema } from "@/context/prompt/PromptContext.types";
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import { z } from "zod";

export type SubmitPromptRequest = z.infer<typeof CreatePromptFormSchema> & {
  roundId: PromptAttributes["round_id"];
};

export type GetAllPromptsByRoundIdResponse = PromptAttributes[];
export type SubmitPromptResponse = PromptAttributes[];

export interface SimilarityScoreResponse {
  src_img_url: string;
  img_url: string;
  similarity_score: number;
}
