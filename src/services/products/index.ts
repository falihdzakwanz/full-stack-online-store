import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () => instance.get("/api/products"),
  addProduct: (data: any, token: string) =>
    instance.post(
      "/api/products",
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  updateProduct: (id: string, data: any, token: string) =>
    instance.put(
      `/api/products/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteProduct: (id: string, token: string) =>
    instance.delete(
      `/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};

export default productServices;
