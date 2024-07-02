import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useToaster } from "@/context/ToasterContext";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { Product } from "@/types/product.type";
import productServices from "@/services/products";
import { deleteFile } from "@/lib/firebase/service";

type PropTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData } = props;
  const session: any = useSession();
  const { setToaster } = useToaster();

  const handleDelete = async () => {
    try {
      const response = await productServices.deleteProduct(
        deletedProduct.id,
        session.data?.accessToken
      );
      const result = response.data;

      if (result.statusCode === 200) {
        const deletedFile = await deleteFile(
          `/images/products/${deletedProduct.id}/${deletedProduct.image.split("%2F")[3].split("?")[0]}`
        );

        if (deletedFile) {
          setDeletedProduct({});
          const { data } = await productServices.getAllProducts();
          setProductsData(data.data);
          setToaster({
            variant: "success",
            message: "Success Delete Product",
          });
        } else {
          setToaster({
            variant: "error",
            message: "Failed Delete Product",
          });
        }
      } else {
        setToaster({
          variant: "error",
          message: "Failed Delete Product",
        });
      }
    } catch (error) {
      setToaster({
        variant: "error",
        message: "Failed Delete Product. Something went wrong",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className="text-xl">Are you sure?</h1>
      <Button
        type="button"
        onClick={() => handleDelete()}
        className="bg-black text-white rounded-sm text-sm p-2 mt-1"
      >
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteProduct;
