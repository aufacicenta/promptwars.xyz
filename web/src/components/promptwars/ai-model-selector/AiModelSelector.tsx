import { AiModelSelectorProps } from "./AiModelSelector.types";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePromptContext } from "@/context/prompt/usePromptContext";
import { useEffect } from "react";
import regexp from "@/lib/regexp";

export const AiModelSelector: React.FC<AiModelSelectorProps> = ({ form }) => {
  const { textToImgModels, getTextToImgModels } = usePromptContext();

  useEffect(() => {
    getTextToImgModels();
  }, []);

  useEffect(() => {
    if (!textToImgModels.length) return;

    form.setValue("textToImgModelId", textToImgModels[0].id!);
  }, [textToImgModels]);

  return (
    <FormField
      control={form.control}
      name="textToImgModelId"
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="AI Model" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {textToImgModels.map((model) => (
                <SelectItem
                  value={model.id!}
                  key={model.id}
                >{`${model.provider}/${regexp.getAiModelNameOnly(model.model)}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
