import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//! Step-2, Create initial State
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

//! Create a async thunk for user authentication

const registerUser = createAsyncThunk(
  "/auth/registerUser",
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

//! Step-1, Create a Slice, Auth SLice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  //! Create extra reducers to handle the async thunk actions
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
      });
  },
});

//! Step-3, Export the Reducer and action
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export { registerUser }; //! Export the async thunk for use in components
