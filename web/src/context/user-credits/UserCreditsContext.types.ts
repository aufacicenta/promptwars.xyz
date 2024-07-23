import { CreditBalanceResponse } from "@/lib/api-client";
import { ReactNode } from "react";

export type UserCreditsContextControllerProps = {
  children: ReactNode;
};

export type UserCreditsContextType = {
  credits: CreditBalanceResponse;
};
