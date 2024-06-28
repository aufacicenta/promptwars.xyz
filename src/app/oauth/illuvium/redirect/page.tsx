"use client";

import { useEffect } from "react";
import passport from "@/lib/illuvium/passport";

export default function Page() {
  useEffect(() => {
    console.log("CALLING LOGINCALLBACK");
    (async () => {
      try {
        await passport.passportInstance.loginCallback();
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <p>Redirect Page</p>
    </div>
  );
}
