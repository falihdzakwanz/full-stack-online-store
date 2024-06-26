import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import { BiEdit, BiTrash } from "react-icons/bi";
import ModalDeleteUser from "./ModalDeleteUser";
import { User } from "@/types/user.type";

type PropTypes = {
  users: User[];
};

const UsersManagementView = (props: PropTypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div className="px-9 py-12">
          <h1 className="text-2xl font-bold">Users Management</h1>
          <table className="w-full border-collapse border">
            <thead className="text-center bg-slate-400">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Fullname</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Role</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User, index: number) => (
                <tr key={index}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{user.fullname}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.phone}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2 flex gap-2">
                    <Button
                      className="bg-blue-700 text-white text-2xl p-2"
                      type="button"
                      onClick={() => setUpdatedUser(user)}
                    >
                      <BiEdit />
                    </Button>
                    <Button
                      className="bg-red-700 text-white text-2xl p-2"
                      type="button"
                      onClick={() => setDeletedUser(user)}
                    >
                      <BiTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {!!Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
        />
      )}
      {!!Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
};

export default UsersManagementView;
