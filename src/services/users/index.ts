import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/users"),
  updateUser: (id: string, data: any) =>
    instance.put("/api/users", { id, data }),
  deleteUser: (id: string) => instance.delete(`/api/users/${id}`),
};

export default userServices;
