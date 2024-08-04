/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Round } from "@promptwars/database/models";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { CurrentRoundResponse } from "../models/Round";
import { AiModelsTextToImgResponse } from "../models/TextToImg";

export class TextToImgService {
  /**
   * Get all text to img models
   * @returns Promise<AiModelsTextToImgResponse> all models data
   * @throws ApiError
   */
  public static getTextToImgModels(): CancelablePromise<AiModelsTextToImgResponse[]> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/ai/models/text-to-img",
    });
  }
}
