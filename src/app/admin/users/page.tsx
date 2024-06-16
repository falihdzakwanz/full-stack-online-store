"use client";

import UsersManagementView from "@/components/views/admin/Users";
import userServices from "@/services/users";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const session: any = useSession();

  useEffect(() => {
    const getAllUsers = async () => {
      if (session.status === "authenticated" && session.data?.accessToken) {
        const { data } = await userServices.getAllUsers(
          session.data.accessToken
        );
        setUsers(data.data);
      }
    };
    getAllUsers();
  }, [session]);

  return (
    <>
      <UsersManagementView users={users} />
    </>
  );
};

export default Page;
