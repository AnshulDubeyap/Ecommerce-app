import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

//! Step-8-3, Initialize the initial State
const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! Step-8-5, Create a function to handle form submission
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData))
        .then((data) => {
          console.log("Register response:", data); // Debug line

          const message = data?.payload?.message || "Something went wrong";
          const success = data?.payload?.success;

          toast(message, {
            description: success
                ? "Welcome! You can now login."
                : "Please try again.",
            variant: success ? "success" : "destructive",
          });

          if (success) {
            navigate("/auth/login");
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          toast("Unexpected error occurred", {
            variant: "destructive",
          });
        });
  }

  return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Create new account
          </h1>
          <p className="mt-2">Already have an account?</p>
          <Link
              className="font-medium ml-2 text-primary hover:underline"
              to="/auth/login"
          >
            Login
          </Link>
        </div>

        <CommonForm
            formControls={registerFormControls}
            buttonText="Sign Up"
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
        />
      </div>
  );
}

export default AuthRegister;
