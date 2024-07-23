"use client";

import clsx from "clsx";
import { CreditsProps } from "./Credits.types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserCreditsContext } from "@/context/user-credits/useUserCreditsContext";
import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const Credits: React.FC<CreditsProps> = ({ className }) => {
  const { credits } = useUserCreditsContext();
  const routes = useRoutes();

  return (
    <Dialog>
      <div className={clsx(className, "flex min-h-screen flex-col justify-center")}>
        <section className="container">
          <Card className="mx-auto w-6/12">
            <CardHeader>
              <CardTitle>Credits</CardTitle>
              <CardDescription>Each game round costs 1 credit. 1 credit equals 1.00 USDT/ETH</CardDescription>
            </CardHeader>
            <CardContent className="flex h-16 flex-col justify-center">
              <h1 className="mb-0 font-mono">{credits?.balance}</h1>
            </CardContent>
            <CardFooter>
              <DialogTrigger asChild>
                <Button className="mr-2">Top Up</Button>
              </DialogTrigger>
              <Link href={routes.home()}>
                <Button variant="outline">Back</Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credits Top Up</DialogTitle>
          <DialogDescription>Transfer USDT/ETH to your game wallet:</DialogDescription>
        </DialogHeader>

        <div className="mb-4 flex w-full items-center space-x-2">
          <Input type="text" placeholder="0x" disabled value={credits.wallet_address!} />
          <Button type="submit" variant="outline">
            Copy
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <h3>Transaction History</h3>
          </CardHeader>
          <CardContent>
            <p className="text-center text-slate-500">
              Transactions will get listed here once you transfer funds to your game wallet.
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
