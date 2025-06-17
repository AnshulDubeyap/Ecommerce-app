//! Step-11, Create a Admin header component

import { AlignJustify, LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({ setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Step-11-1, Add a menu button and icon  */}
      <Button
        className="lg:hidden sm:block"
        onClick={() => {
          setOpen(true);
        }}
      >
        {/* Import icon from lucide React */}
        <AlignJustify />
        {/* Give button a name */}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {/* Step-11-2, Add a Logout button and icon */}
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
