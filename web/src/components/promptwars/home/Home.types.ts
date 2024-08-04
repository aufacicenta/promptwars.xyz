import { ReactNode } from "react";
import { z } from "zod";

export const FormSchema = z.object({
  roundId: z.string({
    required_error: "roundId cannot be empty",
  }),
  prompt: z.string({
    required_error: "Prompt cannot be empty",
  }),
  textToImgModelId: z.string({
    required_error: "Please select a model to display.",
  }),
});

export type HomeProps = {
  children?: ReactNode;
  className?: string;
};
