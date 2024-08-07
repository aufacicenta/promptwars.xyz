import { CreateUserRequest, SignInRequest } from "@/lib/api-client/models/User";
import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

export const SignInFormSchema = z.object({
  email: z
    .string({
      required_error: "Email cannot be empty",
    })
    .email(),
  password: z.string({
    required_error: "Password cannot be empty",
  }),
});

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
  signOut: { isLoading: boolean };
  signIn: { isLoading: boolean };
  signUp: { isLoading: boolean };
  getCurrentUser: { isLoading: boolean };
};

export type AuthorizationContextControllerProps = {
  children: ReactNode;
};

export type AuthorizationContextType = {
  isSignUpDialogOpen: boolean;
  setSignUpDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSignInDialogOpen: boolean;
  setSignInDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actions: AuthorizationContextControllerActions;
  currentUser?: User;
  signUpForm: UseFormReturn<z.infer<typeof CreateUserFormSchema>>;
  signInForm: UseFormReturn<z.infer<typeof SignInFormSchema>>;
  signIn: (_data: SignInRequest) => Promise<void>;
  signUp: (_data: CreateUserRequest) => Promise<void>;
  signOut: () => Promise<void>;
};
