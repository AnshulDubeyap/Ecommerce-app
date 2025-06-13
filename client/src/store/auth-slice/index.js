import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//! Step-2, Create initial State
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

//! Create a async thunk for user authentication(Register)

const registerUser = createAsyncThunk(
  "/auth/register",
  //! Get the formData and return the response
  async (formData) => {
    //! Make a POST request to the server to register the user
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true, //! Allow cookies to be sent with the request
      }
    );
    //! Return the response data
    return response.data;
  }
);

//! Create a async thunk for user authentication(Login)
const loginUser = createAsyncThunk(
  "/auth/login",
  //! Get the formData and return the response
  async (formData) => {
    //! Make a POST request to the server to register the user
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true, //! Allow cookies to be sent with the request
      }
    );
    //! Return the response data
    return response.data;
  }
);

//! Creating a async thunk for middleware(cookies)
const checkAuth = createAsyncThunk(
  "/auth/check-auth",

  async () => {
    //! Make a POST request to the server to register the user
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true, //! Allow cookies to be sent with the request
        headers: {
          "Cache-Control":
            "no-cache, no-store, must-revalidate, proxy-revalidate",
          "Content-Type": "application/json",
        },
      }
    );
    //! Return the response data
    return response.data;
  }
);

//! Step-1, Create a Slice, Auth SLice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  //! Create extra reducers to handle the async thunk actions(Register)
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; //! Set loading to true when the request is pending
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false; //! Set loading to false when the request is fulfilled
        state.user = null; //! Store data in state when user login
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false; //! Set loading to false when the request is rejected
        state.user = null; //! Set the user data to null when the request is rejected
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; //! Set loading to true when the request is pending
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false; //! Set loading to false when the request is fulfilled

        console.log("Login successful:", action.payload);
        state.user = action.payload.success ? action.payload.user : null; //! Store data in state when user login
        state.isAuthenticated = action.payload.success ? true : false; //! Set isAuthenticated to true when the user logs in
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false; //! Set loading to false when the request is rejected
        state.user = null; //! Set the user data to null when the request is rejected
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

//! Step-3, Export the Reducer and action
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export { registerUser, loginUser, checkAuth }; //! Export the async thunk for use in components
