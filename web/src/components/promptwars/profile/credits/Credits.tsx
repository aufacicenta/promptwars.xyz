"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { CreditsProps } from "./Credits.types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserCreditsContext } from "@/context/user-credits/useUserCreditsContext";
import Link from "next/link";
import { useRoutes } from "@/hooks/useRoutes/useRoutes";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard, RotateCw } from "lucide-react";

export const Credits: React.FC<CreditsProps> = ({ className }) => {
  const { credits, refreshCreditsBalance, actions } = useUserCreditsContext();
  const routes = useRoutes();

  return (
    <Dialog>
      <div className={clsx(className, "flex min-h-screen flex-col justify-center")}>
        <section className="container">
          <Card className="mx-auto mb-12 w-6/12">
            <CardHeader>
              <CardTitle>Credits</CardTitle>
              <CardDescription>1 credit equals 1.00 USD</CardDescription>
            </CardHeader>
            <CardContent className="flex h-32 flex-col justify-center">
              <div className="flex items-center">
                <h1 className="mb-0 font-mono">{credits?.balance}</h1>
                <Separator orientation="vertical" className="ml-4 mr-2" />
                <Button size="sm" variant="ghost" onClick={refreshCreditsBalance}>
                  <RotateCw className="mr-2" size="0.75rem" />
                  {actions.refreshCreditsBalance.isLoading ? "Loading" : "Refresh"}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mr-2">Top Up</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Checkout With</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => undefined}>
                      {/* @TODO implement buy credits with PayPal */}
                      <CreditCard className="mr-2" /> PayPal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => undefined}>
                      {/* @TODO implement buy credits with ETH/USDT transfer */}
                      <span className="mr-2">Ξ</span> Ethereum USDT
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="mr-2" variant="outline">
                Withdraw
              </Button>
              <Link href={routes.home()} className="ml-auto">
                <Button variant="outline">Back</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="mx-auto w-6/12">
            <CardHeader className="text-center">
              <h3>Transaction History</h3>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-500">
                Transactions will get listed here once you transfer funds to your game wallet.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credits Top Up</DialogTitle>
          <DialogDescription>Transfer USDT/ETH to your game wallet:</DialogDescription>
        </DialogHeader>

        <div className="mb-4 flex w-full items-center space-x-2">
          {/* @TODO bring back in-game EVM wallet funding */}
          <Input type="text" placeholder="0x" disabled value="0x" />
          <Button type="submit" variant="outline">
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
