"use client";

import React, { useEffect, useState } from "react";

import {
  AuthorizationContextControllerActions,
  AuthorizationContextControllerProps,
  AuthorizationContextType,
  CreateUserFormSchema,
} from "./AuthorizationContext.types";
import { AuthorizationContext } from "./AuthorizationContext";
import supabase from "@/lib/supabase";
import { CreateUserRequest } from "@/lib/api-client/models/User";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@supabase/supabase-js";

export const AuthorizationContextController = ({ children }: AuthorizationContextControllerProps) => {
  const [_hasThirdPartyCookieAccess, setThirdPartyCookieAccess] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [actions, setActions] = useState<AuthorizationContextControllerActions>({
    signUp: {
      isLoading: false,
    },
    getCurrentUser: {
      isLoading: false,
    },
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

      getCurrentUser();
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

      if (!user) {
        throw new Error("Failed to fetch current user");
      }

      if (error) {
        throw error;
      }

      setCurrentUser(user);
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
    currentUser,
    actions,
  };

  return <AuthorizationContext.Provider value={props}>{children}</AuthorizationContext.Provider>;
};
