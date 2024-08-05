"use client";

import React, { useEffect, useState } from "react";

import {
  AuthorizationContextControllerActions,
  AuthorizationContextControllerProps,
  AuthorizationContextType,
  CreateUserFormSchema,
  SignInFormSchema,
} from "./AuthorizationContext.types";
import { AuthorizationContext } from "./AuthorizationContext";
import supabase from "@/lib/supabase";
import { CreateUserRequest, SignInRequest } from "@/lib/api-client/models/User";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

export const AuthorizationContextController = ({ children }: AuthorizationContextControllerProps) => {
  const [_hasThirdPartyCookieAccess, setThirdPartyCookieAccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);
  const [actions, setActions] = useState<AuthorizationContextControllerActions>({
    signIn: {
      isLoading: false,
    },
    signUp: {
      isLoading: false,
    },
    getCurrentUser: {
      isLoading: false,
    },
  });

  const signInForm = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
  });

  const signUpForm = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
  });

  async function signUp({ email, password }: CreateUserRequest) {
    setActions((prev) => ({
      ...prev,
      signUp: {
        isLoading: true,
      },
    }));

    try {
      const { data, error } = await supabase.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log({ data });

      signUpForm.reset();

      if (data?.user?.id) {
        setCurrentUser(data.user);
      } else {
        getCurrentUser();
      }
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      signUp: {
        isLoading: false,
      },
    }));
  }

  async function signIn({ email, password }: SignInRequest) {
    setActions((prev) => ({
      ...prev,
      signIn: {
        isLoading: true,
      },
    }));

    try {
      const { data, error } = await supabase.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log({ data });

      signInForm.reset();

      getCurrentUser();
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      signIn: {
        isLoading: false,
      },
    }));
  }

  async function getCurrentUser() {
    setActions((prev) => ({
      ...prev,
      getCurrentUser: {
        isLoading: true,
      },
    }));

    try {
      const {
        data: { user },
        error,
      } = await supabase.client.auth.getUser();

      if (error) {
        throw error;
      }

      if (!user) {
        throw new Error("Failed to fetch current user");
      }

      console.log({ user });

      setCurrentUser(user);
      setSignUpDialogOpen(false);
      setSignInDialogOpen(false);
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      getCurrentUser: {
        isLoading: false,
      },
    }));
  }

  async function handleCookieAccessInit() {
    if (!document.hasStorageAccess) {
      // Storage Access API is not supported so best we can do is
      // hope it's an older browser that doesn't block 3P cookies.
      setThirdPartyCookieAccess(true);
    } else {
      // Check whether access has been granted via the Storage Access API.
      // Note on page load this will always be false initially so we could be
      // skipped in this example, but including for completeness for when this
      // is not so obvious.
      const hasAccess = await document.hasStorageAccess();
      setThirdPartyCookieAccess(hasAccess);

      if (!hasAccess) {
        try {
          await document.requestStorageAccess();
          setThirdPartyCookieAccess(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  useEffect(() => {
    handleCookieAccessInit();
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const props: AuthorizationContextType = {
    signUp,
    signUpForm,
    signIn,
    signInForm,
    currentUser,
    actions,
    isSignUpDialogOpen,
    setSignUpDialogOpen,
    isSignInDialogOpen,
    setSignInDialogOpen,
  };

  return <AuthorizationContext.Provider value={props}>{children}</AuthorizationContext.Provider>;
};
