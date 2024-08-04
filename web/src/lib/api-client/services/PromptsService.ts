/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Round } from "@promptwars/database/models";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { CurrentRoundResponse } from "../models/Round";
import { SubmitPromptRequest, SubmitPromptResponse } from "../models/Prompt";

export class PromptsService {
  /**
   * Get the current round
   * @returns Promise<any> The current round data
   * @throws ApiError
   */
  public static submitPrompt(body: SubmitPromptRequest): CancelablePromise<SubmitPromptResponse> {
    return __request(OpenAPI, {
      body,
      method: "POST",
      url: "/prompts",
    });
  }
}
