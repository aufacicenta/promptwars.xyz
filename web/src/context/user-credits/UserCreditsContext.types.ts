import { CreditBalanceResponse, UserGetResponse } from "@/lib/api-client";
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
  user?: UserGetResponse;
  refreshCreditsBalance: () => Promise<void>;
};
