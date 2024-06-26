import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/users";
import { useToaster } from "@/context/ToasterContext";
import { useSession } from "next-auth/react";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();
  const { setToaster } = useToaster();

  const handleDelete = async () => {

    const response = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
    const result = response.data;

    if (result.statusCode === 200) {
      setDeletedUser({});
      const { data } = await userServices.getAllUsers(
        session.data?.accessToken
      );
      setUsersData(data.data);
      setToaster({
        variant: "success",
        message: "Success Delete User",
      });
    } else {
      setToaster({
        variant: "error",
        message: "Failed Delete User",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
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

export default ModalDeleteUser;
