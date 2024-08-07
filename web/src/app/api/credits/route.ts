import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import db from "@/lib/sequelize";

export async function GET(request: NextRequest) {
  try {
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

    const { Credit } = await db.load();

    const userCredits = await Credit.findOne({
      where: {
        user_id,
      },
    });

    return NextResponse.json(userCredits?.toJSON());
  } catch (error) {
    console.error("Error in GET /api/credits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
