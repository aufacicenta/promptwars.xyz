import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/sequelize";
import { AiModelsTextToImgResponse } from "@/lib/api-client/models/TextToImg";

export async function GET(_request: NextRequest) {
  try {
    const { TextToImg } = await db.load();

    const models = await TextToImg.findAll();

    if (!models) {
      return NextResponse.json({ error: "No models found" }, { status: 404 });
    }

    return NextResponse.json<AiModelsTextToImgResponse[]>(models);
  } catch (error) {
    console.error("Error creating new round:", error);
    return NextResponse.json({ error: "Failed to create new round" }, { status: 500 });
  }
}
