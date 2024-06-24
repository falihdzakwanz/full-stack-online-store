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
  image?: string;
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
  userData.image = "";

  try {
    await addData("users", userData);
    return true;
  } catch (error) {
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
  id?: string;
  email: string;
  fullname: string;
  password?: string;
  phone?: string;
  type: string;
  role?: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}) {
  try {
    const user = await retrieveDataByField("users", "email", data.email);

    if (user.length > 0) {
      return user[0];
    } else {
      data.role = "member";
      data.createdAt = new Date();
      data.updatedAt = new Date();
      data.password = "";

      const res = await addData("users", data);
      data.id = res.path.replace("users/", "")

      return data;
    }
  } catch (error) {
    throw new Error("Failed to login with Google");
  }
}
