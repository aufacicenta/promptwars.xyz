/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditBalanceResponse } from "../models/CreditBalanceResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class AuthService {
  /**
   * Upon email confirmation, send this request to create the default User Credits record
   * @param accessToken
   * @returns void Successful Response
   * @throws ApiError
   */
  public static onSignupEmailConfirmationCallback(accessToken: string): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/auth/signup/redirect",
      query: {
        accessToken,
      },
    });
  }
}
