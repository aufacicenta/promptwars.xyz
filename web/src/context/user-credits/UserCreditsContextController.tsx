"use client";
import React, { useCallback, useEffect, useState } from "react";

import { UserCreditsContext } from "./UserCreditsContext";
import {
  UserCreditContextActions,
  UserCreditsContextControllerProps,
  UserCreditsContextType,
} from "./UserCreditsContext.types";
import { useAccount } from "wagmi";
import { CreditBalanceResponse, CreditsService, UserGetResponse, UsersService } from "@/lib/api-client";
import { useWebsocketsContext } from "../websockets/useWebsocketsContext";

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

  const { isConnected, address } = useAccount();
  const { connectWebSocket, closeWebSocket } = useWebsocketsContext();

  const refreshCreditsBalance = useCallback(async () => {
    setActions((prev) => ({
      ...prev,
      refreshCreditsBalance: {
        isLoading: true,
      },
    }));

    try {
      const __user = await UsersService.getUserUsersEthereumAddressGet(address!);
      setUser(__user);

      const __credits = await CreditsService.getCreditBalanceCreditsUserIdGet(__user.id);
      setCredits(__credits);
    } catch (error) {
      console.error(error);
    }

    setActions((prev) => ({
      ...prev,
      refreshCreditsBalance: {
        isLoading: false,
      },
    }));
  }, [address]);

  useEffect(() => {
    connectWebSocket((data) => {
      if (data.user_id === user?.id) {
        console.log(`Received ${data.credit_amount} credits`);
        setCredits((prev) => ({ ...prev, balance: data.new_balance }));
      }
    });

    return () => {
      closeWebSocket();
    };
  }, [connectWebSocket, closeWebSocket, user]);

  useEffect(() => {
    if (!isConnected || !address) return;

    refreshCreditsBalance();
  }, [isConnected, address, refreshCreditsBalance]);

  const props: UserCreditsContextType = {
    credits,
    user,
    refreshCreditsBalance,
    actions,
  };

  return <UserCreditsContext.Provider value={props}>{children}</UserCreditsContext.Provider>;
};
