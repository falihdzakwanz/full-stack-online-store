import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const users = await retrieveData("users");
  const data = users.map((user: any) => {
    delete user.password;
    return user;
  });

  return NextResponse.json({
    status: true,
    statusCode: 200,
    message: "Success",
    data,
  });
}

export async function PUT(request: NextRequest) {
  const { id, data } = await request.json();
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
      message: "Failed",
    });
  }
}

export async function DELETE(request: NextRequest) {
  const urlParts = new URL(request.url);
  const id: any = urlParts.pathname.split("/").pop();

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
}
