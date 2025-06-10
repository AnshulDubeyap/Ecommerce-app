//! Step-8, Creating the register page

import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

//! Step-8-3, Initialize the initial State
const initialState = {
  UserName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  //! Step-8-2, Create a state for formData
  const [formData, setFormData] = useState(initialState);

  //! Step-8-5, Create a function to handle form submission
  function onSubmit() {}

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
