"use client";

import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, ComponentType, LazyExoticComponent } from "react";

type PropTypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
  title?: string;
};

const loadIcon = (
  iconName: string
): LazyExoticComponent<ComponentType<any>> => {
  return React.lazy(() =>
    import(`react-icons/bi`).then((module) => {
      const IconComponent = module[iconName as keyof typeof module];
      if (IconComponent) {
        return { default: IconComponent as ComponentType<any> };
      } else {
        throw new Error(`Icon ${iconName} not found`);
      }
    })
  );
};

const Sidebar = (props: PropTypes) => {
  const { lists, title } = props;
  const pathname = usePathname();
  const { data } = useSession();

  return (
    <div className="flex flex-col justify-between bg-black text-white p-7 w-[300px] h-screen">
      <div className="">
        <h1 className="mb-10 text-2xl text-center">{title}</h1>
        <div className="flex flex-col gap-5">
          {lists.map((list, index) => {
            const IconComponent = loadIcon(list.icon);
            return (
              <Link
                href={list.url}
                key={index}
                className={`rounded-sm text-lg flex gap-1 items-center transition-all ease-in-out py-2 px-4 ${
                  pathname === list.url
                    ? "bg-white text-black"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                <Suspense fallback={<div className="text-2xl"></div>}>
                  <IconComponent className="text-2xl" />
                </Suspense>
                <h4>{list.title}</h4>
              </Link>
            );
          })}
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
