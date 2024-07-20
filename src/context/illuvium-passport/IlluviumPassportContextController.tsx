"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Provider, UserProfile } from "@imtbl/sdk/passport";

import { IlluviumPassportContext } from "./IlluviumPassportContext";
import { IlluviumPassportContextControllerProps, IlluviumPassportContextType } from "./IlluviumPassportContext.types";
import passport from "@/lib/illuvium/passport";
import jwt from "@/lib/jwt";
import { useAccount } from "wagmi";

export const IlluviumPassportContextController = ({ children }: IlluviumPassportContextControllerProps) => {
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [zkEVMProvider, setZkEVMProvider] = useState<Provider>();

  const { isConnected } = useAccount();

  const login = useCallback(async () => {
    try {
      await zkEVMProvider?.request({ method: "eth_requestAccounts" });
    } catch (err) {
      console.error("Failed to login");
      console.error(err);
    }

    try {
      const userProfile = await passport.passportInstance.getUserInfo();
      setUserInfo(userProfile);
    } catch (err) {
      console.error("Failed to fetch user info");
      console.error(err);
    }

    try {
      const idToken = await passport.passportInstance.getIdToken();
      const parsedIdToken = jwt.parseJwt(idToken!);
      console.log(parsedIdToken);
      setWalletAddress(parsedIdToken.passport.imx_eth_address);
    } catch (err) {
      console.error("Failed to fetch idToken");
      console.error(err);
    }
  }, [zkEVMProvider]);

  useEffect(() => {
    if (!isConnected) return;

    login();
  }, [isConnected, login]);

  useEffect(() => {
    console.log(userInfo, walletAddress);
  }, [userInfo, walletAddress]);

  useEffect(() => {
    (async () => {
      try {
        setZkEVMProvider(passport.passportInstance.connectEvm());
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const loginCallback = async () => {
    try {
      await passport.passportInstance.loginCallback();

      await login();
    } catch (error) {
      console.error(error);
    }
  };

  const props: IlluviumPassportContextType = {
    login,
    loginCallback,
  };

  return <IlluviumPassportContext.Provider value={props}>{children}</IlluviumPassportContext.Provider>;
};
