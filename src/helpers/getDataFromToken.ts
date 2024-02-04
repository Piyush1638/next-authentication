import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";


export const getDataFromToken = (request: NextRequest)=>{
    try {
       const token = request.cookies.get('token')?.value || '';  // Get the user's JWT token from cookies, if it exists
       const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
       return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}