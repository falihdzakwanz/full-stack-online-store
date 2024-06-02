import { signUp } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const success = await signUp(body);

    if (success) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Success",
      });
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Failed",
      });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "An internal server error occurred.",
    });
  }
}
