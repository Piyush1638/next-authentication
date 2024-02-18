import dbConnect from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Post  from "@/backend/models/postsModel";
import User from "@/backend/models/userModel";

export async function POST(request: NextRequest){
    try {
        await dbConnect();
        const reqBody = await request.json();
        const {title, description, hashtags,uid} = reqBody;
        const newPost = {
            title: title,
            description: description,
            hashtags: hashtags,
            uid: uid,
        }
        const new_Post = new Post(newPost);
        await new_Post.save();
        const obj = {
            pid: new_Post._id,
            type: "POST"
        }
        const updatedUser = await User.findByIdAndUpdate(uid,
            {
                $push: {myPosts:JSON.stringify(obj)}
            },{new: true});
        
        const response = NextResponse.json(
                {
                    message: "User Saved Successfully", 
                    success: true, 
                    data: new_Post
                }
        );
        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}