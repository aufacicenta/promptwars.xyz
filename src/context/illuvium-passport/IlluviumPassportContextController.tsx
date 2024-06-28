"use client";

import React, { useEffect, useState } from "react";
import { Provider, UserProfile } from "@imtbl/sdk/passport";

import { IlluviumPassportContext } from "./IlluviumPassportContext";
import { IlluviumPassportContextControllerProps, IlluviumPassportContextType } from "./IlluviumPassportContext.types";
import passport from "@/lib/illuvium/passport";
import jwt from "@/lib/jwt";

export const IlluviumPassportContextController = ({ children }: IlluviumPassportContextControllerProps) => {
  const [userInfo, setUserInfo] = useState<UserProfile>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [zkEVMProvider, setZkEVMProvider] = useState<Provider>();

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

  const login = async () => {
    // try {
    //   await passport.passportInstance.login();
    // } catch (err) {
    //   console.error("Failed to login");
    //   console.error(err);
    // }

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
      setWalletAddress(parsedIdToken.passport.imx_eth_address);
    } catch (err) {
      console.error("Failed to fetch idToken");
      console.error(err);
    }
  };

  const props: IlluviumPassportContextType = {
    login,
  };

  return <IlluviumPassportContext.Provider value={props}>{children}</IlluviumPassportContext.Provider>;
};
