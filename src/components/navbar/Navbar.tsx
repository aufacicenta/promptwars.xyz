"use client";

import clsx from "clsx";
import { NavbarProps } from "./Navbar.types";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { useIlluviumPassportContext } from "@/context/illuvium-passport/useIlluviumPassportContext";
import { WalletSelector } from "../wallet-selector/WalletSelector";

export const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const passportContext = useIlluviumPassportContext();

  const onClickConnectIMXPassport = async () => {
    try {
      await passportContext.login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={clsx(
        className,
        "fixed top-0 z-30 flex h-14 w-screen items-center justify-end gap-4 border-b bg-background px-4 py-3 sm:h-auto sm:border-0 sm:px-6",
      )}
    >
      <Button variant="outline" onClick={onClickConnectIMXPassport}>
        <User className="mr-2" />
        Connect With IMX Passport
      </Button>

      <WalletSelector />
    </header>
  );
};
