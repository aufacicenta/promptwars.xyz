/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreditBalanceResponse } from '../models/CreditBalanceResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CreditsService {
    /**
     * Get Credit Balance
     * @param userId
     * @returns CreditBalanceResponse Successful Response
     * @throws ApiError
     */
    public static getCreditBalanceCreditsUserIdGet(
        userId: string,
    ): CancelablePromise<CreditBalanceResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/credits/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
