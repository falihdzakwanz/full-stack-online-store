import Sidebar from "@/components/fragments/Sidebar"

type Proptypes = {
    children: React.ReactNode;
}

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
];

const AdminLayout = (props: Proptypes) => {
    const { children } = props;
    return (
        <div>
            <Sidebar lists={listSidebarItem} />
            {children}
        </div>
    )
}

export default AdminLayout;