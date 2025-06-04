import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

//! Step-4, Configure the store
//? We will add multiple reducer and create a global reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

//! Step-5, Export the store
export default store;
