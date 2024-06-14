"use client";

import UsersManagementView from "@/components/views/admin/Users";
import userServices from "@/services/users";
import { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <UsersManagementView users={users} />
    </>
  );
};

export default Page;
