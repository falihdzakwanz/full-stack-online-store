import Image from "next/image";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";

type PropTypes = {
    product: Product;
    key: string;
}

const Card = (props: PropTypes) => {
    const { product, key } = props;

  return (
    <div key={key} className="cursor-pointer">
      <Image
        src={product.image}
        alt="Product"
        width={200}
        height={200}
        className="w-full h-auto aspect-square rounded-md"
      />
      <h4 className="font-bold text-2xl mt-2">{product.name}</h4>
      <p className="text-base mt-1">{product.category}</p>
      <p className="text-base mt-1">{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;