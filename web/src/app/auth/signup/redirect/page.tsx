"use client";

import { Button } from "@/components/ui/button";
import { useAuthorizationContext } from "@/context/authorization/useAuthorizationContext";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import { ReloadIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
  const { signUpCallback, actions } = useAuthorizationContext();

  const routes = useRoutes();

  useEffect(() => {
    signUpCallback();
  }, []);

  return (
    <div className={clsx("flex min-h-screen flex-col justify-center py-40")}>
      <section className="container text-center">
        <h3 className="mb-8">We are completing your signup process. Hold tight!</h3>
        {actions.signUpCallback.isLoading ? (
          <Button disabled variant="outline" size="lg">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading
          </Button>
        ) : (
          <Button>
            <Link href={routes.home()}>Done! Play Your First Round</Link>
          </Button>
        )}
      </section>
    </div>
  );
}
