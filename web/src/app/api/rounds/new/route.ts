import { RoundAttributes } from "@promptwars/database/models/Round";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isValid } from "date-fns";
import unsplash from "@/lib/unsplash";
import db from "@/lib/sequelize";
import ipfs from "@/lib/ipfs";
import { ApiResponse } from "unsplash-js/dist/helpers/response";
import { Random } from "unsplash-js/dist/methods/photos/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { starts_at, ends_at, credit_cost, total_credits } = body;

    // @TODO check if current round is still ongoing

    // Validate and parse date strings to UTC Date objects using date-fns
    const startsAtUTC = parseISO(starts_at);
    const endsAtUTC = parseISO(ends_at);

    if (!isValid(startsAtUTC) || !isValid(endsAtUTC)) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const image = await unsplash.serverApi.photos.getRandom({ orientation: "squarish" });

    const src_img_url = await ipfs.getFileAsIPFSUrl((image as ApiResponse<Random>).response?.urls.regular!);

    const roundAttributes: RoundAttributes = {
      starts_at: startsAtUTC,
      ends_at: endsAtUTC,
      credit_cost: credit_cost || 1,
      total_credits: total_credits || 0,
      src_img_url,
    };

    const { Round, RoundResult } = await db.load();

    const newRound = await Round.create(roundAttributes);

    const winnerDistributions = [0.7, 0.2, 0.1]; // default winner distribution
    await Promise.all(
      winnerDistributions.map((distribution) =>
        RoundResult.create({
          round_id: newRound.id,
          winner_distribution: distribution,
        }),
      ),
    );

    return NextResponse.json(newRound.toJSON());
  } catch (error) {
    console.error("Error creating new round:", error);
    return NextResponse.json({ error: "Failed to create new round" }, { status: 500 });
  }
}
