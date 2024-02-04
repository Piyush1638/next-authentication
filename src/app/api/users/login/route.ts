import dbConnect from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";



export async function  POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        
        // Checking if user already exists in the database  
        const existingUser = await User.findOne({ email: reqBody.email });
        if (!existingUser){
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }

        // Verifying the entered password with the hashed one stored in the database
        const validPassword = await bcryptjs.compare(reqBody.password, existingUser.password);
        if (!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400});
        }

        // Create tokendata to store in the cookies
        const tokenData = {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
        }

        // Create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
       
        // Send the token in the response
        const response = NextResponse.json(
            {
                message: "Logged in successfully", 
                success: true, 
            }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}