"use client";

import ProductsAdminView from "@/components/views/admin/Products";
import productServices from "@/services/products";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const session: any = useSession();
  const getAllProducts = async () => {
    const { data } = await productServices
      .getAllProducts
      // session.data.accessToken
      ();
    setProducts(data.data);
  };

  useEffect(() => {
    if (
      session.status === "authenticated" &&
      session.data?.accessToken &&
      Object.keys(products).length === 0
    ) {
      getAllProducts();
    }
  }, [session, products]);

  return (
    <>
      <ProductsAdminView products={products} />
    </>
  );
};

export default Page;
