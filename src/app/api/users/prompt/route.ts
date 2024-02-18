import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbconfig";
import Prompt from "@/backend/models/promptsModel";
import User from "@/backend/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const reqBody = await request.json();
    const { title, description, hashtags, uid, prompt } = reqBody;

    // Check if user exists
    const existingUser = await User.findById(uid);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPrompt = {
      title: title,
      description: description,
      hashtags: hashtags,
      uid: uid,
      prompt: prompt,
    };

    const newPromptModel = new Prompt(newPrompt);
    await newPromptModel.save();

    const obj = {
      pid: newPromptModel._id,
      type: "PROMPT",
    };

    // Parse myPosts array and update user
    const updatedUser = await User.findByIdAndUpdate(
      uid,
      { $push: { myPosts: JSON.parse(JSON.stringify(obj)) } },
      { new: true }
    );

    console.log("Updated User:", updatedUser);

    // Use 201 Created status for success
    const response = NextResponse.json({
      message: "Prompt added successfully",
      success: true,
      data: newPromptModel,
    });

    return response;
  } catch (error: any) {
    console.error("Server Error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
