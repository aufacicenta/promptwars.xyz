import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/sequelize";
import { CurrentRoundResponse } from "@/lib/api-client/models/Round";

export async function GET(_request: NextRequest) {
  try {
    const { Round } = await db.load();

    const currentRound = await Round.findOne({
      order: [["ends_at", "DESC"]],
    });

    if (!currentRound) {
      return NextResponse.json({ error: "No rounds found" }, { status: 404 });
    }

    const count = await Round.count();

    const round = {
      ...currentRound.toJSON(),
      count,
    };

    return NextResponse.json<CurrentRoundResponse>(round);
  } catch (error) {
    console.error("Error creating new round:", error);
    return NextResponse.json({ error: "Failed to create new round" }, { status: 500 });
  }
}
