import { createSlice } from "@reduxjs/toolkit";

//! Step-2, Create initial State
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

//! Step-1, Create a Slice, Auth SLice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
});

//! Step-3, Export the Reducer and action
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
