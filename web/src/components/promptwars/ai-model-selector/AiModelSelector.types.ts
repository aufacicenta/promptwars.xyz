import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "../home/Home.types";
import { z } from "zod";

export type AiModelSelectorProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  children?: ReactNode;
  className?: string;
};
