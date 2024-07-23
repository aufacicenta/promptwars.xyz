"use client";
import React, { useEffect, useState } from "react";

import { UserCreditsContext } from "./UserCreditsContext";
import { UserCreditsContextControllerProps, UserCreditsContextType } from "./UserCreditsContext.types";
import { useAccount } from "wagmi";
import { CreditBalanceResponse, CreditsService, UsersService } from "@/lib/api-client";

export const UserCreditsContextController = ({ children }: UserCreditsContextControllerProps) => {
  const [credits, setCredits] = useState<CreditBalanceResponse>({
    balance: 0,
    wallet_address: null,
  });

  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (!isConnected || !address) return;

    (async () => {
      try {
        const user = await UsersService.getUserUsersEthereumAddressGet(address!);
        console.log(user);

        const __credits = await CreditsService.getCreditBalanceCreditsUserIdGet(user.id);
        setCredits(__credits);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isConnected, address]);

  const props: UserCreditsContextType = {
    credits,
  };

  return <UserCreditsContext.Provider value={props}>{children}</UserCreditsContext.Provider>;
};
