"use client";

import React, { useState } from "react";
import { RoundContext } from "./RoundContext";
import { RoundContextControllerProps, RoundContextType } from "./RoundContext.types";
import { RoundsService } from "@/lib/api-client";
import { CurrentRoundResponse } from "@/lib/api-client/models/Round";

export const RoundContextController = ({ children }: RoundContextControllerProps) => {
  const [currentRound, setCurrentRound] = useState<CurrentRoundResponse | undefined>(undefined);

  const getCurrentRound = async () => {
    try {
      const round = await RoundsService.getCurrentRound();

      setCurrentRound(round);
    } catch (error) {
      console.error("Error fetching current round:", error);
    }
  };

  const props: RoundContextType = {
    getCurrentRound,
    currentRound,
  };

  return <RoundContext.Provider value={props}>{children}</RoundContext.Provider>;
};
