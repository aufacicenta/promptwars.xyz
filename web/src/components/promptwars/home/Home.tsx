"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import clsx from "clsx";
import { FormSchema, HomeProps } from "./Home.types";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRoundContext } from "@/context/round/useRoundContext";
import { useEffect } from "react";
import { AiModelSelector } from "@/components/promptwars/ai-model-selector/AiModelSelector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePromptContext } from "@/context/prompt/usePromptContext";
import { ReloadIcon } from "@radix-ui/react-icons";

export const Home: React.FC<HomeProps> = ({ className }) => {
  const { getCurrentRound, currentRound } = useRoundContext();
  const { submitPrompt, actions } = usePromptContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submitPrompt(data);
  }

  useEffect(() => {
    getCurrentRound();
  }, []);

  useEffect(() => {
    if (!currentRound) return;

    form.setValue("roundId", currentRound?.id!);
  }, [currentRound]);

  return (
    <div className={clsx(className, "flex min-h-screen flex-col justify-center")}>
      <section className="container">
        <div id="info-screen" className="w-full">
          <Card className="mx-auto w-60">
            <CardContent className="flex h-fit flex-col justify-center">
              <h4 className="mb-2 text-center font-mono">PROMPT WARS</h4>
              <p className="mb-0 text-center font-mono text-sm text-muted-foreground">
                Round #{currentRound ? currentRound.count : "Loading..."}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto h-4 w-8 bg-secondary"></div>
        <div id="image-screen">
          <Card className="mx-auto w-2/3">
            <CardContent
              className="flex min-h-96 flex-col items-center justify-center bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentRound?.src_img_url})`,
              }}
            ></CardContent>
          </Card>
        </div>
        <div className="mx-auto h-4 w-16 bg-secondary"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div id="prompt-panel">
              <Card className="mx-auto w-7/12">
                <CardContent className="pt-6">
                  <div className="flex content-between">
                    <div className="w-5/12">
                      <AiModelSelector form={form} />
                    </div>
                    <div className="mb-3 flex h-10 w-8/12 justify-end gap-3 text-right font-mono text-sm text-muted-foreground">
                      <div>
                        <span className="block">200</span>
                        <p className="text-xs">Current Round Players</p>
                      </div>
                      <Separator orientation="vertical" />
                      <div>
                        <span className="block">$21,000.00</span>
                        <p className="text-xs">USD Bag</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea placeholder="Write your prompt down." className="mb-3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-right">
                        <Button type="submit" disabled={actions.submitPrompt.isLoading}>
                          {actions.submitPrompt.isLoading && (<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />)}
                          Submit</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};
