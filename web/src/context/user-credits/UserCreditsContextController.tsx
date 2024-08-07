"use client";
import React, { useCallback, useState } from "react";

import { UserCreditsContext } from "./UserCreditsContext";
import {
  UserCreditContextActions,
  UserCreditsContextControllerProps,
  UserCreditsContextType,
} from "./UserCreditsContext.types";
import { CreditBalanceResponse, CreditsService } from "@/lib/api-client";

export const UserCreditsContextController = ({ children }: UserCreditsContextControllerProps) => {
  const [credits, setCredits] = useState<CreditBalanceResponse>({
    balance: 0,
    user_id: "",
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
      const result = await CreditsService.getCreditBalanceByUserSession();

      console.log({ result });

      setCredits(result);
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
    refreshCreditsBalance,
    actions,
  };

  return <UserCreditsContext.Provider value={props}>{children}</UserCreditsContext.Provider>;
};
