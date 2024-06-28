"use client";

import React, { useEffect, useState } from "react";

import { AuthorizationContextControllerProps, AuthorizationContextType } from "./AuthorizationContext.types";
import { AuthorizationContext } from "./AuthorizationContext";

export const AuthorizationContextController = ({ children }: AuthorizationContextControllerProps) => {
  const [_hasThirdPartyCookieAccess, setThirdPartyCookieAccess] = useState(false);

  async function handleCookieAccessInit() {
    if (!document.hasStorageAccess) {
      // Storage Access API is not supported so best we can do is
      // hope it's an older browser that doesn't block 3P cookies.
      setThirdPartyCookieAccess(true);
    } else {
      // Check whether access has been granted via the Storage Access API.
      // Note on page load this will always be false initially so we could be
      // skipped in this example, but including for completeness for when this
      // is not so obvious.
      const hasAccess = await document.hasStorageAccess();
      setThirdPartyCookieAccess(hasAccess);

      if (!hasAccess) {
        try {
          await document.requestStorageAccess();
          setThirdPartyCookieAccess(true);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  useEffect(() => {
    handleCookieAccessInit();
  }, []);

  const props: AuthorizationContextType = {};

  return <AuthorizationContext.Provider value={props}>{children}</AuthorizationContext.Provider>;
};
