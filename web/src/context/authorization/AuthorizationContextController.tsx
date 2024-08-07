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
import { useToast } from "@/components/ui/use-toast";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import { AuthService } from "@/lib/api-client/services/AuthService";
import { Button } from "@/components/ui/button";

export const AuthorizationContextController = ({ children }: AuthorizationContextControllerProps) => {
  const [_hasThirdPartyCookieAccess, setThirdPartyCookieAccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isSignUpDialogOpen, setSignUpDialogOpen] = useState(false);
  const [isSignInDialogOpen, setSignInDialogOpen] = useState(false);
  const [actions, setActions] = useState<AuthorizationContextControllerActions>({
    signOut: {
      isLoading: false,
    },
    signIn: {
      isLoading: false,
    },
    signUp: {
      isLoading: false,
    },
    signUpCallback: {
      isLoading: false,
    },
    getCurrentUser: {
      isLoading: false,
    },
  });

  const routes = useRoutes();

  const { toast } = useToast();

  const signInForm = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
  });

  const signUpForm = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
  });

  async function signUpCallback() {
    setActions((prev) => ({
      ...prev,
      signUpCallback: {
        isLoading: true,
      },
    }));

    try {
      const hash = window.location.hash.substring(1);
      const searchParams = new URLSearchParams(hash);
      const accessToken = searchParams.get("access_token");

      if (!accessToken) {
        throw new Error("No access_token is present in email confirmation redirect");
      }

      const result = await AuthService.onSignupEmailConfirmationCallback(accessToken!);

      console.log({ result });
    } catch (error) {
      console.error(error);

      toast({
        title: "Signup Error",
        description: "An error ocurred while verifying your email.",
        action: <Button>Verify Again</Button>,
      });
    }

    setActions((prev) => ({
      ...prev,
      signUpCallback: {
        isLoading: false,
      },
    }));
  }

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
        options: {
          emailRedirectTo: routes.auth.signup.redirect(),
        },
      });

      if (error) {
        throw error;
      }

      console.log({ data });

      signUpForm.reset({
        email: "",
        password: "",
      });

      if (data?.user?.id) {
        setCurrentUser(data.user);

        toast({
          title: "Email Verification Sent!",
          description: "Confirm your email address and get 3 FREE credits to play!",
          variant: "accent",
        });
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

  async function signOut() {
    setActions((prev) => ({
      ...prev,
      signOut: {
        isLoading: true,
      },
    }));

    try {
      const { error } = await supabase.client.auth.signOut();

      if (error) {
        throw error;
      }

      setCurrentUser(undefined);
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      signOut: {
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
    signUpCallback,
    signUp,
    signUpForm,
    signIn,
    signInForm,
    signOut,
    currentUser,
    actions,
    isSignUpDialogOpen,
    setSignUpDialogOpen,
    isSignInDialogOpen,
    setSignInDialogOpen,
  };

  return <AuthorizationContext.Provider value={props}>{children}</AuthorizationContext.Provider>;
};
