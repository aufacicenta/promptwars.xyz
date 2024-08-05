/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import {
  GetAllPromptsByRoundIdResponse,
  SimilarityScoreResponse,
  SubmitPromptRequest,
  SubmitPromptResponse,
} from "../models/Prompt";
import supabase from "@/lib/supabase";
import { apiOrigin } from "@/hooks/useRoutes/useRoutes";

export class PromptsService {
  /**
   * Get similarity score between two images
   * @param srcImgUrl URL of the source image
   * @param imgUrl URL of the image to compare
   * @returns Promise<SimilarityScoreResponse> The similarity score between the two images
   * @throws ApiError
   */
  public static async getSimilarityScore(
    srcImgUrl: string,
    imgUrl: string,
  ): CancelablePromise<SimilarityScoreResponse> {
    OpenAPI.BASE = apiOrigin;
    return __request(OpenAPI, {
      method: "GET",
      url: `/prompts/similarity-score`,
      query: {
        src_img_url: srcImgUrl,
        img_url: imgUrl,
      },
    });
  }
  /**
   * Get all prompts by roundId
   * @returns Promise<SubmitPromptResponse> All the prompts from this round
   * @throws ApiError
   */
  public static async getAllByRoundId(
    roundId: PromptAttributes["round_id"],
  ): CancelablePromise<GetAllPromptsByRoundIdResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: `/prompts?roundId=${roundId}`,
    });
  }

  /**
   * Submit a prompt
   * @returns Promise<SubmitPromptResponse> All the prompts from this round
   * @throws ApiError
   */
  public static async submitPrompt(body: SubmitPromptRequest): CancelablePromise<SubmitPromptResponse> {
    const session = await supabase.client.auth.getSession();

    if (!session.data.session?.access_token) {
      throw new Error("Failed to submit prompt. User is not authenticated.");
    }

    const accessToken = session.data.session.access_token;

    return __request(OpenAPI, {
      body,
      method: "POST",
      url: "/prompts",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
