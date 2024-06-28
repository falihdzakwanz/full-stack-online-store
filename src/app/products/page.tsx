"use client"

import ProductView from "@/components/views/products";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import productServices from "@/services/products";

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
            <Head>
                <title>Products</title>
            </Head>
            <ProductView products={products}/>
        </>
    )
}

export default Page;