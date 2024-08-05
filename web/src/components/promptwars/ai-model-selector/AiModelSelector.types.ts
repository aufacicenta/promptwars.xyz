import { CreatePromptFormSchema } from "@/context/prompt/PromptContext.types";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export type AiModelSelectorProps = {
  form: UseFormReturn<z.infer<typeof CreatePromptFormSchema>>;
  children?: ReactNode;
  className?: string;
};
