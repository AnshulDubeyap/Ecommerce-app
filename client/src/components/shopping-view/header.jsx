//! Step-16, Create a common Shopping view header

import { HousePlug, LogOut, Menu, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector, } from "react-redux";
import { useState } from "react";
import { shoppingViewHeaderMenuItems } from "@/config";
import UserCartWrapper from "../../components/shopping-view/cart-wrapper";

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
import { ShoppingCart } from "lucide-react";

//! Step-16-4-3, Create a function to render MenuItems
function MenuItems() {
  return (
      <nav className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-3 lg:mb-0">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Link
                key={menuItem.id}
                to={menuItem.path}
                className="text-sm font-medium hover:text-primary transition-colors"
            >
              {menuItem.label}
            </Link>
        ))}
      </nav>
  );
}

function HeaderRightContent() {
  const user = useSelector((state) => state.auth.user);
  console.log(user, "user");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCartSheet, setOpenCartSheet] = useState(false);

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/shop/home"); // optional redirect after logout
  }

  return (
      <div className="flex items-center gap-4">
        <Sheet open={openCartSheet} onOpenChange={()=> setOpenCartSheet(false)}>
          <Button variant='outline' size="icon" onClick={() => setOpenCartSheet(true)}>
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">User Cart</span>
          </Button>
          <UserCartWrapper />
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black cursor-pointer">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>
              Logged in as {user?.userName || "User"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
}

function ShoppingHeader() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left logo */}
          <Link to="/shop/home" className="flex items-center gap-2">
            <HousePlug className="h-6 w-6" />
            <span className="font-bold">Ecommerce</span>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full max-w-xs">
              <MenuItems />
              {isAuthenticated && <HeaderRightContent />}
            </SheetContent>
          </Sheet>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 justify-center">
            <MenuItems />
          </div>

          {/* Desktop Right (Avatar) */}
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
