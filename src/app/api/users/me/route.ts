import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/backend/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    console.error("Error fetching user data:", error.message);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
