/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditBalanceResponse } from "../models/CreditBalanceResponse";
import supabase from "@/lib/supabase";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class CreditsService {
  /**
   * Get Credit Balance
   * @param userId
   * @returns CreditBalanceResponse Successful Response
   * @throws ApiError
   */
  public static async getCreditBalanceByUserSession(): CancelablePromise<CreditBalanceResponse> {
    const session = await supabase.client.auth.getSession();

    if (!session.data.session?.access_token) {
      throw new Error("Failed to submit prompt. User is not authenticated.");
    }

    const accessToken = session.data.session.access_token;

    return __request(OpenAPI, {
      method: "GET",
      url: "/credits",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}
