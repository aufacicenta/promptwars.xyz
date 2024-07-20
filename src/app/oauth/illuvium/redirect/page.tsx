"use client";

import { useEffect } from "react";
import { useIlluviumPassportContext } from "@/context/illuvium-passport/useIlluviumPassportContext";

export default function Page() {
  const passportContext = useIlluviumPassportContext();

  useEffect(() => {
    (async () => {
      await passportContext.loginCallback();
    })();
  }, [passportContext]);

  return (
    <div className="flex min-h-screen flex-col justify-center">
      <p>Redirect Page</p>
    </div>
  );
}
