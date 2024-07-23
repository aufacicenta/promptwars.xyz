import clsx from "clsx";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

import evm from "@/lib/evm";

import { WalletSelectorProps } from "./WalletSelector.types";
import { Button } from "../ui/button";
import { WalletMinimal } from "lucide-react";
import { useEffect } from "react";
import { UsersService } from "@/lib/api-client";

export const WalletSelector: React.FC<WalletSelectorProps> = ({ className }) => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected || !address) return;

    try {
      (async () => {
        await UsersService.createUserUsersPost({ ethereum_address: address! });
      })();
    } catch (error) {
      console.error(error);
    }
  }, [isConnected, address]);

  const handleOnDisplayWidgetClick = () => {
    if (isConnected) {
      open({ view: "Account" });
    } else {
      open();
    }
  };

  return (
    <div className={clsx(className)}>
      <Button color="secondary" variant="outline" onClick={handleOnDisplayWidgetClick}>
        <>
          <WalletMinimal className="mr-2" />
          {isConnected ? <>{evm.format.truncate(address!)}</> : <>Connect Wallet</>}
        </>
      </Button>
    </div>
  );
};
