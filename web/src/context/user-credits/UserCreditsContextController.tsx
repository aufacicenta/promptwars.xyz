"use client";
import React, { useCallback, useState } from "react";

import { UserCreditsContext } from "./UserCreditsContext";
import {
  UserCreditContextActions,
  UserCreditsContextControllerProps,
  UserCreditsContextType,
} from "./UserCreditsContext.types";
import { CreditBalanceResponse, UserGetResponse } from "@/lib/api-client";

export const UserCreditsContextController = ({ children }: UserCreditsContextControllerProps) => {
  const [user, setUser] = useState<UserGetResponse | undefined>();
  const [credits, setCredits] = useState<CreditBalanceResponse>({
    balance: 0,
    wallet_address: null,
  });
  const [actions, setActions] = useState<UserCreditContextActions>({
    refreshCreditsBalance: {
      isLoading: false,
    },
  });

  const refreshCreditsBalance = useCallback(async () => {
    setActions((prev) => ({
      ...prev,
      refreshCreditsBalance: {
        isLoading: true,
      },
    }));

    try {
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      refreshCreditsBalance: {
        isLoading: false,
      },
    }));
  }, []);

  const props: UserCreditsContextType = {
    credits,
    user,
    refreshCreditsBalance,
    actions,
  };

  return <UserCreditsContext.Provider value={props}>{children}</UserCreditsContext.Provider>;
};
