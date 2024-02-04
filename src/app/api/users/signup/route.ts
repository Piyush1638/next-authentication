import dbConnect from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log("Request Body:", reqBody);

    //   check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    //  hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      console.error("Failed to create an account");
      throw Error("Failed to create an account");
    }

    console.log("Account created successfully:", savedUser);

    return NextResponse.json({
      message: "Account created successfully",
      success: true,
      data: savedUser,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
