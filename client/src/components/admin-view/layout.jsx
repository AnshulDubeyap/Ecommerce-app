//! Step-9, Create a Admin Layout

import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSideBar] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* Step-9-1, Admin sidebar */}
      <AdminSidebar open={openSidebar} setOpen={setOpenSideBar} />
      <div className="flex flex-col flex-1">
        {/* Step-9-2, Admin header */}
        <AdminHeader setOpen={setOpenSideBar} />
        <div className="flex flex-col flex-1 bg-muted/40 p-4 md:p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
