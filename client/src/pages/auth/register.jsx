//! Step-8, Creating the register page

import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

//! Step-8-3, Initialize the initial State
const initialState = {
  UserName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  //! Step-8-2, Create a state for formData
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch(); //! Import useDispatch from react-redux
  const navigate = useNavigate(); //! Import useNavigate from react-router-dom

  //! Step-8-5, Create a function to handle form submission
  function onSubmit(event) {
    event.preventDefault(); //! Prevent the default form submission behavior
    dispatch(registerUser(formData)) //! Dispatch the registerUser action with formData
      .then((data) => {
        console.log("Registration successful:", data);
        navigate("/auth/login"); //! Navigate to the login page on successful registration
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">Already have a account?</p>
        {/* Step-8-1, Import Link from routerDom */}
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      {/* Step-8-4, Call the commonForm Component and pass the props */}
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
