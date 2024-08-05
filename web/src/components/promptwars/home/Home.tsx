"use client";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import clsx from "clsx";
import { HomeProps } from "./Home.types";
import { Card, CardContent } from "@/components/ui/card";
import regexp from "@/lib/regexp";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRoundContext } from "@/context/round/useRoundContext";
import { AiModelSelector } from "@/components/promptwars/ai-model-selector/AiModelSelector";
import { usePromptContext } from "@/context/prompt/usePromptContext";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CreatePromptFormSchema } from "@/context/prompt/PromptContext.types";
import { useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Coins } from "lucide-react";
import currency from "@/lib/currency";

export const Home: React.FC<HomeProps> = ({ className }) => {
  const { currentRound } = useRoundContext();
  const { submitPrompt, actions, form, getAllPromptsByRoundId, promptsByRoundId } = usePromptContext();

  function onSubmit(data: z.infer<typeof CreatePromptFormSchema>) {
    submitPrompt(data);
  }

  useEffect(() => {
    if (!currentRound) return;

    getAllPromptsByRoundId(currentRound.id!);
  }, [currentRound]);

  return (
    <div className={clsx(className, "flex min-h-screen flex-col justify-center py-24")}>
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
                        <span className="block">{promptsByRoundId.length}</span>
                        <p className="text-xs">Players</p>
                      </div>
                      <Separator orientation="vertical" />
                      <div>
                        <span className="block">70%, 20%, 10%</span>
                        <p className="text-xs">Price Distribution</p>
                      </div>
                      <Separator orientation="vertical" />
                      <div>
                        <span className="block">
                          <Coins className="mr-2 inline h-4 w-4" />1
                        </span>
                        <p className="text-xs">Cost</p>
                      </div>
                      <Separator orientation="vertical" />
                      <div>
                        <span className="block">{currency.formatFiatCurrency(currentRound?.total_credits || 0)}</span>
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
                              <Textarea
                                placeholder="Write your prompt down."
                                className="mb-3"
                                {...field}
                                disabled={actions.submitPrompt.isLoading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-right">
                        <Button type="submit" disabled={actions.submitPrompt.isLoading}>
                          {actions.submitPrompt.isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>

        <div className="mx-auto mt-8 w-7/12 bg-secondary" id="current-round-prompts">
          <Card>
            <CardContent>
              <Table>
                <TableCaption>Displays the top 10 prompts of the current round by similarity score.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Score</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Model</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promptsByRoundId.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell>{prompt.similarity_score}</TableCell>
                      <TableCell className="font-medium">{prompt.user_id}</TableCell>
                      <TableCell>{`${prompt.TextToImg?.provider}/${regexp.getAiModelNameOnly(prompt.TextToImg?.model || "")}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
