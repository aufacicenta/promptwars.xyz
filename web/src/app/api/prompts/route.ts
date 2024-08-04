import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/sequelize";
import replicate from "@/lib/replicate";
import { SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import ipfs from "@/lib/ipfs";

export async function POST(request: NextRequest) {
  try {
    const body: SubmitPromptRequest = await request.json();
    const { textToImgModelId, prompt, roundId } = body;

    // @TODO get user_id from JWT headers

    const { Prompt, TextToImg } = await db.load();

    const model = await TextToImg.findByPk(textToImgModelId);

    const output = (await replicate.client.run(`${model?.provider}/${model?.model}`, {
      input: {
        width: 512,
        height: 512,
        prompt,
        num_images: 1,
        guidance_scale: 8,
        archive_outputs: false,
        prompt_strength: 1,
        sizing_strategy: "width/height",
      },
    })) as string[];

    if (!output || output?.length === 0) {
      throw new Error("Failed to generate image from prompt");
    }

    const image_url = await ipfs.getFileAsIPFSUrl(output[0]);

    const promptAttributes: PromptAttributes = {
      round_id: roundId,
      user_id: "user_id",
      text_to_img_id: textToImgModelId,
      image_url,
      prompt_text: prompt,
    };

    const newPrompt = await Prompt.create(promptAttributes);

    return NextResponse.json(newPrompt.toJSON());
  } catch (error) {
    console.error("Error creating new prompt:", error);
    return NextResponse.json({ error: "Failed to create new prompt" }, { status: 500 });
  }
}
