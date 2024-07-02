import { addData, deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
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

export async function POST(request: NextRequest) {
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

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({
        status: false,
        statusCode: 403,
        message: "Access denied",
        data: {},
      });
    }

    const { data } = await request.json();
    data.created_at = new Date();
    data.updated_at = new Date();
    data.price = parseInt(data.price);
    data.stock.filter((stock: any) => {
      stock.qty = parseInt(stock.qty);
    });

    const result = await addData("products", data);

    if (result) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "Success",
        data: { id: result.id },
      });
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: "Failed to add product",
        data: {},
      });
    }
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
    const id: string = url.pathname.split("/").pop() || "";
    const token = request.headers.get("authorization")?.split(" ")[1] || "";
    const { data } = await request.json();

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

    if (id === undefined || id === "") {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "Not Found: ID is missing",
      });
    }

    const result = await updateData("products", id, data);

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
        message: "Failed to update product",
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
    const id: string = url.pathname.split("/").pop() || "";
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

    if (id === undefined || id === "") {
      return NextResponse.json({
        status: false,
        statusCode: 404,
        message: "Not Found: ID is missing",
      });
    }

    const result = await deleteData("products", id);

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
        message: "Failed to delete product",
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
