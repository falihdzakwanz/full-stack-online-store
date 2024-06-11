"use client";

import Button from "@/components/ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidDashboard, BiSolidBox } from "react-icons/bi";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

type IconType = {
  [key: string]: JSX.Element;
};

const Sidebar = (props: Proptypes) => {
  const icons: IconType = {
    BiSolidDashboard: <BiSolidDashboard className="text-2xl" />,
    BiSolidBox: <BiSolidBox className="text-2xl" />,
  };
  const { lists } = props;
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <div className="flex flex-col justify-between bg-black text-white p-7 w-[300px] h-screen">
      <div className="">
        <h1 className="mb-10 text-2xl">Admin Panel</h1>
        <div className="flex flex-col gap-5">
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={index}
              className={`rounded-sm text-lg flex gap-1 items-center transition-all ease-in-out py-2 px-4 ${
                pathname === list.url
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              {icons[list.icon]}
              <h4>{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <Button
          type="button"
          className={"w-full bg-white text-black p-1 mt-2 rounded-sm"}
          onClick={() => {
            data && signOut();
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
