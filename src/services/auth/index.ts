import instance from "@/lib/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post("/api/users/register", data),
};

export default authServices;