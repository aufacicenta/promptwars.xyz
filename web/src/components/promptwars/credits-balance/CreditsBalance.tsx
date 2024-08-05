import clsx from "clsx";
import { CreditsBalanceProps } from "./CreditsBalance.types";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import { useUserCreditsContext } from "@/context/user-credits/useUserCreditsContext";

export const CreditsBalance: React.FC<CreditsBalanceProps> = ({ className }) => {
  const routes = useRoutes();

  const { credits } = useUserCreditsContext();

  return (
    <div className={clsx(className)}>
      <Button color="secondary" variant="outline" asChild>
        <Link href={routes.profile.credits()}>
          <>
            <Coins className="mr-2" />
            {credits?.balance} Credits
          </>
        </Link>
      </Button>
    </div>
  );
};
