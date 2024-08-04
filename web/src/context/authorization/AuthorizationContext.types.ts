import { CreateUserRequest } from "@/lib/api-client/models/User";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

export const CreateUserFormSchema = z.object({
  email: z
    .string({
      required_error: "Email cannot be empty",
    })
    .email(),
  password: z.string({
    required_error: "Password cannot be empty",
  }),
});

export type AccessTokens = {};

export type AuthorizationContextControllerActions = {
  signUp: { isLoading: boolean };
  getCurrentUser: { isLoading: boolean };
};

export type AuthorizationContextControllerProps = {
  children: ReactNode;
};

export type AuthorizationContextType = {
  actions: AuthorizationContextControllerActions;
  currentUser?: User;
  signUpForm: UseFormReturn<z.infer<typeof CreateUserFormSchema>>;
  signUp: (_data: CreateUserRequest) => Promise<void>;
};
