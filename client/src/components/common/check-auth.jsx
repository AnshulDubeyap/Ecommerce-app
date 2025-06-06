import { Navigate, useLocation } from "react-router-dom";

//! Step-22, Create the Check-Auth component
function CheckAuth({ isAuthenticated, user, children }) {
  //! Step-22-1, get the location
  const location = useLocation();

  //! Step-22-2, if User is not authenticated, and user is on page that is not login or register
  if (
    !isAuthenticated &&
    !location.pathname.includes("/login") &&
    !location.pathname.includes("/register")
  ) {
    //! Step-22-3, then navigate user to login page
    return <Navigate to={"/auth/login"} />;
  }

  //! Step-22-4, if user is authenticated and user is on login page
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    //! Step-22-5, if user is admin
    if (user?.role === "admin") {
      //! Step-22-6, then navigate to admin page
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      //! Step-22-7, else navigate to home page
      return <Navigate to={"/shop/home"} />;
    }
  }

  //! Step-22-8, if user is authenticated and user is not admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    //! Step-22-9, then navigate the user to unauth-page
    return <Navigate to={"/unauth-page"} />;
  }

  //! Step-22-10, if user is admin and user is on shopping page
  if (user?.role === "admin" && location.pathname.includes("shop")) {
    //! Step-22-11, navigate the user to admin page
    return <Navigate to={"/admin/dashboard"} />;
  }

  return <>{children}</>;
}

export default CheckAuth;
