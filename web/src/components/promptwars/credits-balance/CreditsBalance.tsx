import clsx from "clsx";
import { CreditsBalanceProps } from "./CreditsBalance.types";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import { useUserCreditsContext } from "@/context/user-credits/useUserCreditsContext";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const CreditsBalance: React.FC<CreditsBalanceProps> = ({ className }) => {
  const routes = useRoutes();

  const { credits, refreshCreditsBalance, actions } = useUserCreditsContext();

  useEffect(() => {
    refreshCreditsBalance();
  }, []);

  return (
    <div className={clsx(className)}>
      <Button color="secondary" variant="outline" asChild>
        <Link href={routes.profile.credits()}>
          <>
            {actions.refreshCreditsBalance.isLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Coins className="mr-2" />
            )}
            {Number(credits?.balance).toFixed(0)} Credits
          </>
        </Link>
      </Button>
    </div>
  );
};
