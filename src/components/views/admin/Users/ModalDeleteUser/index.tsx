import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/users";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;

  const handleDelete = async () => {
    await userServices.deleteUser(deletedUser.id);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
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
