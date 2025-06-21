//! Step-16, Create a common Shopping view header

import { HousePlug, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";

//! Step-16-5-1,

//! Step-16-4-3, Create a function to for MenuItems
function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          className="text-sm font-medium"
        >
          <span>{menuItem.label}</span>
        </Link>
      ))}
    </nav>
  );
}

function ShoppingHeader() {
  //! Step-16-5-1, Get the isAuthenticated state from the store
  const { isAuthenticated } = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Step-16-1, Add icon and name that links to the home page */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        {/* Step-16-2, Render a Sheet component for mobile navigation */}
        <Sheet>
          <SheetTrigger asChild>
            {/* Step-16-3, Add a menu icon for mobile navigation */}
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            {/* Step-16-4-1, Render MenuItems for mobile navigation */}
            <MenuItems />
          </SheetContent>
        </Sheet>
        {/* Step-16-4-2, Create a div to render MenuItems for desktop navigation */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {/* Step-16-5, Check if user is authenticated and render a User-section on navbar*/}
        {isAuthenticated ? <div></div> : null}
      </div>
    </header>
  );
}

export default ShoppingHeader;
