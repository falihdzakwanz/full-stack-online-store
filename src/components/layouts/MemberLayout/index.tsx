import Sidebar from "@/components/fragments/Sidebar";

type PropTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/member",
    icon: "BiSolidDashboard",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "BiSolidUser",
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: "BiSolidCartAlt",
  },
];

const MemberLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} title="User Panel" />
      <div className="w-full px-6 py-4">{children}</div>
    </div>
  );
};

export default MemberLayout;
