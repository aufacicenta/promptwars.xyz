import { NextRequest, NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import db from "@/lib/sequelize";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get("accessToken");

    if (!accessToken) {
      throw new Error("No access token found in query string");
    }

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

    const { Credit } = await db.load();

    const credits = await Credit.create({
      user_id: user.id,
      balance: 3,
    });

    return NextResponse.json(credits.toJSON());
  } catch (error) {
    console.error("Error creating default user credits:", error);
    return NextResponse.json({ error: "Failed to create default user settings" }, { status: 500 });
  }
}
