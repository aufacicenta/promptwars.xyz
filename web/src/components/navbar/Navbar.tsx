"use client";

import clsx from "clsx";
import { NavbarProps } from "./Navbar.types";
import { CreditsBalance } from "../promptwars/credits-balance/CreditsBalance";

import { AccountDropdownMenu } from "./account-dropdown-menu/AccountDropdownMenu";
import { PromptWarsLogo } from "../svg/PromptWarsLogo";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header
      className={clsx(
        className,
        "fixed top-0 z-30 flex h-14 w-screen items-center justify-between gap-4 border-b bg-background px-4 py-3 sm:h-auto sm:border-0 sm:px-6",
      )}
    >
      <div>
        <PromptWarsLogo className="w-[112px]" />
      </div>

      <div className="flex gap-4">
        <CreditsBalance />
        <AccountDropdownMenu />
      </div>
    </header>
  );
};
