import { CreateUserFormSchema, SignInFormSchema } from "@/context/authorization/AuthorizationContext.types";
import { UserAttributes } from "@promptwars/database/models/User";
import { z } from "zod";

export type SignInRequest = z.infer<typeof SignInFormSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserFormSchema>;

export type CreateUserResponse = UserAttributes;
