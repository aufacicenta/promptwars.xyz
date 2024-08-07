"use client";

import clsx from "clsx";
import { NavbarProps } from "./Navbar.types";
import { CreditsBalance } from "../promptwars/credits-balance/CreditsBalance";

import { AccountDropdownMenu } from "./account-dropdown-menu/AccountDropdownMenu";
import { PromptWarsLogo } from "../svg/PromptWarsLogo";
import { useAuthorizationContext } from "@/context/authorization/useAuthorizationContext";
import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { currentUser } = useAuthorizationContext();

  const routes = useRoutes();

  return (
    <header className={clsx(className, "fixed top-0 z-30 w-screen border-b bg-background")}>
      <section id="top-notifications" className="w-screen">
        {!!currentUser && !currentUser?.email_confirmed_at && (
          <div className="w-screen bg-orange-600 p-1 text-center">
            <p>Verify your email and get 3 FREE credits to play!</p>
          </div>
        )}
      </section>

      <section className="flex items-center justify-between px-4 py-3 sm:h-auto sm:border-0 sm:px-6">
        <div>
          <Link href={routes.home()}>
            <PromptWarsLogo className="w-[112px]" />
          </Link>
        </div>

        <div className="flex gap-4">
          <CreditsBalance />
          <AccountDropdownMenu />
        </div>
      </section>
    </header>
  );
};
