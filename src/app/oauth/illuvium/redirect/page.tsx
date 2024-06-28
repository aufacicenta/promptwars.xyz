"use client";

import { Home } from "@/components/promptwars/home/Home";
import { useLayoutEffect } from "react";
import passport from "@/lib/illuvium/passport";

export default function Page() {
  useLayoutEffect(() => {
    (async () => {
      try {
        await passport.passportInstance.loginCallback();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return <Home />;
}
