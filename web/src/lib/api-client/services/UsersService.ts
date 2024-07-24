/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserCreateResponse } from '../models/UserCreateResponse';
import type { UserGetResponse } from '../models/UserGetResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Create User
     * @param requestBody
     * @returns UserCreateResponse Successful Response
     * @throws ApiError
     */
    public static createUserUsersPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserCreateResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User
     * @param ethereumAddress
     * @returns UserGetResponse Successful Response
     * @throws ApiError
     */
    public static getUserUsersEthereumAddressGet(
        ethereumAddress: string,
    ): CancelablePromise<UserGetResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{ethereum_address}',
            path: {
                'ethereum_address': ethereumAddress,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
