import { CreditBalanceResponse } from "@/lib/api-client";
import { ReactNode } from "react";

export type UserCreditsContextControllerProps = {
  children: ReactNode;
};

export type UserCreditContextActions = {
  refreshCreditsBalance: {
    isLoading: boolean;
  };
};

export type UserCreditsContextType = {
  credits: CreditBalanceResponse;
  actions: UserCreditContextActions;
  refreshCreditsBalance: () => Promise<void>;
};
