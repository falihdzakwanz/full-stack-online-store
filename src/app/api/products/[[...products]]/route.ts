import { retrieveData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // const token = request.headers.get("authorization")?.split(" ")[1] || "";

    // if (!token) {
    //   return NextResponse.json({
    //     status: false,
    //     statusCode: 401,
    //     message: "No token provided",
    //   });
    // }

    // const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    // if (!decoded || decoded.role !== "admin") {
    //   return NextResponse.json({
    //     status: false,
    //     statusCode: 403,
    //     message: "Access denied",
    //   });
    // }

    const data = await retrieveData("products");

    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "Success",
      data,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Invalid token",
      });
    }

    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
}
