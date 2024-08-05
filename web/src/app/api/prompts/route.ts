import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/sequelize";
import supabase from "@/lib/supabase";
import replicate from "@/lib/replicate";
import { SubmitPromptRequest } from "@/lib/api-client/models/Prompt";
import { PromptAttributes } from "@promptwars/database/models/Prompt";
import ipfs from "@/lib/ipfs";
import { PromptsService } from "@/lib/api-client/services/PromptsService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roundId = searchParams.get("roundId");

    if (!roundId) {
      throw new Error("Round ID is required");
    }

    const { Prompt, TextToImg } = await db.load();

    const prompts = await Prompt.findAll({
      where: {
        round_id: roundId,
      },
      include: [
        {
          model: TextToImg,
          attributes: ["id", "provider", "model"],
        },
      ],
    });

    return NextResponse.json(prompts);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json({ error: "Failed to fetch prompts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SubmitPromptRequest = await request.json();
    const { textToImgModelId: text_to_img_id, prompt, roundId: round_id } = body;

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

    const { Prompt, TextToImg, Round } = await db.load();

    // @TODO check if User has enough credits to play

    const model = await TextToImg.findByPk(text_to_img_id);

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

    const currentRound = await Round.findByPk(round_id);
    const srcImgUrl = currentRound?.src_img_url;

    const similarityScoreResult = await PromptsService.getSimilarityScore(srcImgUrl!, image_url);
    const similarity_score = similarityScoreResult.similarity_score;

    const promptAttributes: PromptAttributes = {
      round_id,
      user_id,
      text_to_img_id,
      image_url,
      prompt_text: prompt,
      similarity_score,
    };

    await Prompt.create(promptAttributes);
    await currentRound!.updateTotalCredits();

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
