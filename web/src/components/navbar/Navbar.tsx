"use client";

import clsx from "clsx";
import { NavbarProps } from "./Navbar.types";
import { WalletSelector } from "../wallet-selector/WalletSelector";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  return (
    <header
      className={clsx(
        className,
        "fixed top-0 z-30 flex h-14 w-screen items-center justify-end gap-4 border-b bg-background px-4 py-3 sm:h-auto sm:border-0 sm:px-6",
      )}
    >
      <WalletSelector />
    </header>
  );
};
