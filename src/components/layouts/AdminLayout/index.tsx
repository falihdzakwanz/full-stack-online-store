import Sidebar from "@/components/fragments/Sidebar";

type PropTypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "BiSolidDashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "BiSolidBox",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "BiSolidGroup",
  },
];

const AdminLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} title="Admin Panel" />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
