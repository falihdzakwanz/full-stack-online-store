import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () =>
    instance.get("/api/products"),
};

export default productServices;

// {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }