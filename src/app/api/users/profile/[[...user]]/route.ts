import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1] || "";

    if (!token) {
      return NextResponse.json({
        status: false,
        statusCode: 401,
        message: "No token provided",
        data: {},
      });
    }

    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (!decoded) {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Access denied",
        data: {},
      });
    }
    const profile = await retrieveDataById("users", decoded.id);

    if (!profile) {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "User not found",
        data: {},
      });
    }

    profile.id = decoded.id;

    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "Success",
      data: profile,
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Invalid token",
        data: {},
      });
    }

    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: {},
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

    if (!decoded) {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Access denied",
      });
    }

    if (data.password) {
      const passwordConfirm = await compare(
        data.oldPassword,
        data.encryptedPassword
      );

      if (passwordConfirm) {
        delete data.oldPassword;
        delete data.encryptedPassword;
        data.password = await bcrypt.hash(data.password, 10);
      } else {
        return NextResponse.json({
          status: false,
          statusCode: 400,
          message: "Failed to update password",
        });
      }
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
        message: "Failed to update profile",
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
