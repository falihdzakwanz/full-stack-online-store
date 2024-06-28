import { Product } from "@/types/product.type";
import Card from "./Card";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;

  return (
    <div className="py-14 px-5">
      <h1 className="text-3xl">All Product ({products.length})</h1>
      <main className="flex flex-row">
        <div id="filter" className="w-1/6">
          <div id="data" className="py-5 border-b border-b-black">
            <h4>Gender</h4>
            <div id="list" className="flex flex-col gap-1 mt-2 ">
              <div>
                <input type="checkbox" id="men" />
                <label htmlFor="men">Men</label>
              </div>
              <div>
                <input type="checkbox" id="women" />
                <label htmlFor="women">Women</label>
              </div>
            </div>
          </div>
        </div>
        <div id="content" className="w-full grid grid-cols-3 gap-5 gap-y-15">
          {products.map((product) => (
            <Card product={product} key={product.id}/>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductView;
