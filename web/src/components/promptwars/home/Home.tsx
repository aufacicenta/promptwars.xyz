"use client";

import clsx from "clsx";
import { HomeProps } from "./Home.types";
import { Card, CardContent } from "@/components/ui/card";
import { Image } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserCreditsContext } from "@/context/user-credits/useUserCreditsContext";
import { useRoundContext } from "@/context/round/useRoundContext";
import { useEffect } from "react";

export const Home: React.FC<HomeProps> = ({ className }) => {
  const { credits } = useUserCreditsContext();

  const { getCurrentRound, currentRound } = useRoundContext();

  useEffect(() => {
    getCurrentRound();
  }, []);

  return (
    <div className={clsx(className, "flex min-h-screen flex-col justify-center")}>
      <section className="container">
        <div id="info-screen" className="w-full">
          <Card className="mx-auto w-60">
            <CardContent className="flex h-fit flex-col justify-center">
              <h4 className="mb-2 text-center font-mono">PROMPT WARS</h4>
              <p className="mb-0 text-center font-mono text-sm text-muted-foreground">
                Round #{currentRound ? currentRound.id : "Loading..."}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto h-4 w-8 bg-secondary"></div>
        <div id="image-screen">
          <Card className="mx-auto w-2/3">
            <CardContent className="flex min-h-96 flex-col items-center justify-center">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image />
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto h-4 w-16 bg-secondary"></div>
        <div id="prompt-panel">
          <Card className="mx-auto w-7/12">
            <CardContent className="pt-6">
              <div className="mb-3 flex h-10 justify-end gap-3 text-right font-mono text-sm text-muted-foreground">
                <div>
                  <span className="block">200</span>
                  <p className="text-xs">Current Round Players</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <span className="block">$21,000.00</span>
                  <p className="text-xs">USDT/ETH Bag (Ethereum Mainnet)</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <span className="block">{credits.balance}</span>
                  <p className="mb-0 text-xs">
                    Credits (<span className="underline hover:cursor-pointer hover:text-primary">Top Up</span>)
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-full">
                  <Textarea placeholder="Write your prompt down." className="mb-3" />
                  <div className="text-right">
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
