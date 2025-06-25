//! Step-16, Create a common Shopping view header

import { HousePlug, LogOut, Menu, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";

//! Step-16-4-3, Create a function to for MenuItems
function MenuItems() {
  return (
    <nav className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-3 lg:mb-0">
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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  //! Step-16-6, Create a function for header right content
  function HeaderRightContent() {
    //! Step-16-6-6, Get the User to display in avatar
    const user = useSelector((state) => state.auth.user);
    console.log(user);

    //! Step-16-6-7, Get the navigate function from react-router-dom
    const navigate = useNavigate();

    //! Step-16-6-8, Get a dispatch for calling the Logout async Thunk
    const dispatch = useDispatch();

    //! Step-16-6-9, Create a function to handle logout
    function handleLogout() {
      dispatch(logoutUser());
    }

    return (
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Step-16-6-1, Render the user avatar */}
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          {/* Step-16-6-2, Render the dropdown menu content */}
          <DropdownMenuContent side="right" className="w-56">
            {/* Step-16-6-3, Render the user name and logout button */}
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              {/* Step-16-6-4, Render the account icon and label */}
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              {/* Step-16-6-5, Render the logout icon and label */}
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

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
            {isAuthenticated && <HeaderRightContent />}
          </SheetContent>
        </Sheet>

        {/* Step-16-4-2, Create a div to render MenuItems for desktop navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <MenuItems />
        </div>

        {/* Step-16-5, Check if user is authenticated and render a User-section on navbar*/}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center">
            <HeaderRightContent />
          </div>
        )}
      </div>
    </header>
  );
}

export default ShoppingHeader;
