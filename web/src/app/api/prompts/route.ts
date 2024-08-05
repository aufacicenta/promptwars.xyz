import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/sequelize";
import supabase from "@/lib/supabase";
import replicate from "@/lib/replicate";
import { SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import ipfs from "@/lib/ipfs";

export async function POST(request: NextRequest) {
  try {
    const body: SubmitPromptRequest = await request.json();
    const { textToImgModelId, prompt, roundId: round_id } = body;

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      throw new Error("Invalid access token");
    }

    const accessToken = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await supabase.client.auth.getUser(accessToken);

    if (error) {
      throw error;
    }

    if (!user) {
      throw new Error("Failed to fetch User");
    }

    const user_id = user?.id!;

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

    // @TODO compare the images with the local Python API and get the score
    const similarity_score = 0;

    const promptAttributes: PromptAttributes = {
      round_id,
      user_id,
      text_to_img_id: textToImgModelId,
      image_url,
      prompt_text: prompt,
      similarity_score,
    };

    await Prompt.create(promptAttributes);

    const roundPrompts = await Prompt.findAll({
      where: {
        round_id,
      },
    });

    return NextResponse.json(roundPrompts);
  } catch (error) {
    console.error("Error creating new prompt:", error);
    return NextResponse.json({ error: "Failed to create new prompt" }, { status: 500 });
  }
}
