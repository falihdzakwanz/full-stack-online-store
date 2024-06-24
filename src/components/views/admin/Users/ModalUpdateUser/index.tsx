import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/users";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type Proptypes = {
  updatedUser: any;
  setUpdatedUser: any;
  setUsersData: any;
};

const ModalUpdateUser = (props: Proptypes) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;

    const data = {
      role: form.role.value,
    };

    const response = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );
    const result = response.data;

    if (result.statusCode === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers(
        session.data?.accessToken
      );
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled={true}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled={true}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled={true}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          disabled={false}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button
          type="submit"
          className="bg-black text-white rounded-sm text-sm p-2 mt-1"
        >
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
