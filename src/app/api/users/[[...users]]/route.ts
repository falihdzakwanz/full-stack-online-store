import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1] || "";

    if (!token) {
      return NextResponse.json({
        status: false,
        statusCode: 401,
        message: "No token provided",
      });
    }

    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Access denied",
      });
    }

    const users = await retrieveData("users");
    const data = users.map((user: any) => {
      const { password, ...rest } = user;
      return rest;
    });

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

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id: any = url.pathname.split("/").pop();
    const { data } = await request.json();
    const token = request.headers.get("authorization")?.split(" ")[1] || "";

    if (!token) {
      return NextResponse.json({
        status: false,
        statusCode: 401,
        message: "No token provided",
      });
    }

    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Access denied",
      });
    }

    const result = await updateData("users", id, data);
    if (result) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Success",
      });
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Failed to update user",
      });
    }
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

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id: any = url.pathname.split("/").pop();
    const token = request.headers.get("authorization")?.split(" ")[1] || "";

    if (!token) {
      return NextResponse.json({
        status: false,
        statusCode: 401,
        message: "No token provided",
      });
    }

    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Access denied",
      });
    }

    const result = await deleteData("users", id);

    if (result) {
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
