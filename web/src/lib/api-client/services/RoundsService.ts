/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Round } from "@promptwars/database/models";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
import { CurrentRoundResponse } from "../models/Round";

export class RoundsService {
  /**
   * Get the current round
   * @returns Promise<any> The current round data
   * @throws ApiError
   */
  public static getCurrentRound(): CancelablePromise<CurrentRoundResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/rounds/current",
    });
  }
}
