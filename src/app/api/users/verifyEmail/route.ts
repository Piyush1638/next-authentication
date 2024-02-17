import dbConnect from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    dbConnect();
    const req = await request.json();
    const { token } = req;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid or expired token",
        },
        {
          status: 400,
        }
      );
    }

    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
