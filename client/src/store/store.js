import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductSlice from "./admin/product-slice/index.js";

//! Step-4, Configure the store
//? We will add multiple reducer and create a global reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
  },
});

//! Step-5, Export the store
export default store;
