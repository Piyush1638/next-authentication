import dbConnect from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import Repo  from "@/backend/models/repoModel";
import User from "@/backend/models/userModel";

export async function POST(request: NextRequest){
    try {
        await dbConnect();
        const reqBody = await request.json();
        const {title, description, hashtags,uid, repoLink} = reqBody;
        const newRepo = {
            title: title,
            description: description,
            hashtags: hashtags,
            uid: uid,
            repoLink: repoLink
        }
        const new_Repo = new Repo(newRepo);
        await new_Repo.save();
        const obj = {
            pid: new_Repo._id,
            type: "REPO"
        }
        const updatedUser = await User.findByIdAndUpdate(uid,
            {
                $push: {myPosts:JSON.stringify(obj)}
            },{new: true});
        
        const response = NextResponse.json(
                {
                    message: "New Repo Saved Successfully", 
                    success: true, 
                    data: new_Repo
                },
        );
        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}