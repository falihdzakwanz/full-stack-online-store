import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { useToaster } from "@/context/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/products";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

type PropTypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: PropTypes) => {
  const { updatedProduct, setUpdatedProduct, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();
  const { setToaster } = useToaster();

  const updateProductData = async (form: any, newImageURL: string | null) => {
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: newImageURL,
    };

    try {
      const response: any = await productServices.updateProduct(
        updatedProduct.id,
        data,
        session.data?.accessToken
      );
      const result = response.data;

      if (result.statusCode === 200) {
        setIsLoading(false);
        setUploadedImage(null);
        form.reset();
        setUpdatedProduct(false);
        const { data } = await productServices.getAllProducts();
        setProductsData(data.data);
        setToaster({
          variant: "success",
          message: "Success Update Product",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "error",
          message: "Failed Update Product",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Failed Update Product. Something went wrong",
      });
    }
  };

  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            await updateProductData(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "error",
              message: "Image Size is More Than 1MB",
            });
          }
        }
      );
    }
  };

  const handleUpdatedProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;
    const file = form.image.files[0];

    if (file) {
      uploadImage(updatedProduct.id, form);
    } else {
      await updateProductData(form, updatedProduct.image);
    }
  };

  const handleStock = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: string
  ): void => {
    const newStockCount: any = [...stockCount];
    newStockCount[index][type] = e.target.value;
    setStockCount(newStockCount);
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1 className="font-bold text-2xl">Update Product</h1>
      <form onSubmit={handleUpdatedProduct} className="flex flex-col w-full">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
          defaultValue={updatedProduct.name}
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert product price"
          defaultValue={updatedProduct.price}
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updatedProduct.category}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
        />

        <label htmlFor="image" className="mt-2">
          Image
        </label>
        <div className="flex flex-row justify-center items-center gap-5 mb-2">
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt={updatedProduct.name}
            className="w-1/6 h-auto rounded-md aspect-square"
          />
          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>

        <div className="flex flex-col mt-2 w-full">
          <label htmlFor="stock">Stock</label>

          {stockCount.map(
            (item: { size: string; qty: number }, index: number) => (
              <div className="flex flex-row gap-5" key={index}>
                <div className="w-1/2">
                  <Input
                    label="Size"
                    name="size"
                    type="text"
                    placeholder="Insert product size"
                    onChange={(e) => handleStock(e, index, "size")}
                    defaultValue={item.size}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="QTY"
                    name="qty"
                    type="number"
                    placeholder="Insert product quantity"
                    onChange={(e) => handleStock(e, index, "qty")}
                    defaultValue={item.qty}
                  />
                </div>
              </div>
            )
          )}
          <Button
            type="button"
            onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
            className="w-1/4 bg-black text-white rounded-sm text-sm p-2 mt-1 mb-3 "
          >
            Add New Stock
          </Button>
        </div>

        <Button
          type="submit"
          className="w-1/4 bg-blue-500 text-white rounded-sm text-sm p-2 mt-3"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Update Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
