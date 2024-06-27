import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
};

const ProductsAdminView = (props: PropTypes) => {
  const { products } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className="px-9 py-12">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <table className="w-full border-collapse border">
            <thead className="text-center bg-slate-400">
              <tr>
                <th className="p-2" rowSpan={2}>
                  #
                </th>
                <th className="p-2" rowSpan={2}>
                  Image
                </th>
                <th className="p-2" rowSpan={2}>
                  Name
                </th>
                <th className="p-2" rowSpan={2}>
                  Category
                </th>
                <th className="p-2" rowSpan={2}>
                  Price
                </th>
                <th className="p-2" colSpan={2}>
                  Stock
                </th>
                <th className="p-2" rowSpan={2}>
                  Action
                </th>
              </tr>
              <tr>
                <th className="p-2">Size</th>
                <th className="p-2">QTY</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: Product, index: number) => (
                <>
                  <tr key={index}>
                    <td className="p-2" rowSpan={product.stock.length}>
                      {index + 1}
                    </td>
                    <td className="p-2" rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td className="p-2" rowSpan={product.stock.length}>
                      {product.name}
                    </td>
                    <td className="p-2" rowSpan={product.stock.length}>
                      {product.category}
                    </td>
                    <td className="p-2" rowSpan={product.stock.length}>
                      {convertIDR(product.price)}
                    </td>
                    <td className="p-2">{product.stock[0].size}</td>
                    <td className="p-2">{product.stock[0].qty}</td>
                    <td
                      className="p-2 flex gap-2"
                      rowSpan={product.stock.length}
                    >
                      <Button
                        className="bg-blue-700 text-white text-2xl p-2"
                        type="button"
                      >
                        <BiEdit />
                      </Button>
                      <Button
                        className="bg-red-700 text-white text-2xl p-2"
                        type="button"
                      >
                        <BiTrash />
                      </Button>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td className="p-2">{stock.size}</td>
                            <td className="p-2">{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductsAdminView;
