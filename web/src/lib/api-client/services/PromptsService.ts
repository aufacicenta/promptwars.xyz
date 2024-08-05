/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { GetAllPromptsByRoundIdResponse, SubmitPromptRequest, SubmitPromptResponse } from "../models/Prompt";
import supabase from "@/lib/supabase";

export class PromptsService {
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
