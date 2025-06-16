//! Step-10, Create a Admin sidebar component

import { ChartNoAxesCombined } from "lucide-react";
import { Fragment, use } from "react";
import { useNavigate } from "react-router-dom";
import { CircleCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <CircleCheck />,
  },
];

//! Step-10-4, Create a MenuItems function
function MenuItems() {
  const Navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              Navigate(menuItem.path);
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSidebar() {
  const Navigate = useNavigate();
  //! Step-10-1, Create a Fragment component for admin panel
  return (
    <Fragment>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => {
            //! Step-10-3, Navigate to the admin dashboard on click
            Navigate("/admin/dashboard");
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
