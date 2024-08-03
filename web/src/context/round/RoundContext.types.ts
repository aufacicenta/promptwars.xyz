import { CurrentRoundResponse } from "@/lib/api-client/models/Round";
import { ReactNode } from "react";

export type RoundContextControllerProps = {
  children: ReactNode;
};

export type RoundContextType = {
  getCurrentRound: () => Promise<void>;
  currentRound: CurrentRoundResponse | undefined;
};
