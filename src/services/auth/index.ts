import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signUp(userData: {
  email: string;
  fullname: string;
  phone: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    return false;
  }

  if (!userData.role) {
    userData.role = "member";
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  userData.createdAt = new Date();
  userData.updatedAt = new Date();
  
  try {
    await addData("users", userData);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: {
  email: string;
  fullname: string;
  password?: string;
  phone?: string;
  type: string;
  role?: string;
}) {
  const user = await retrieveDataByField("users", "email", data.email);

  if (user.length > 0) {
    return user[0];
  } else {
    data.role = "member";
    await addData("users", data);
    return data;
  }
}
