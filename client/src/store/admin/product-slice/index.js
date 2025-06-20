import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//! Step-2, Create initial State
const initialState = {
  productList: [],
  isLoading: false,
};

//! Step-3, Create a async thunk for adding a new product
const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  }
);

//! Step-4, Create a async thunk for fetching all products
const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  }
);

//! Step-5, Create a async thunk for editing a product
const editProduct = createAsyncThunk(
  "product/editProduct",
  //! Get the id of the product
  async (id, formData) => {
    const result = await axios.put(
      //! Dynamically pass the id (we will update the id)
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  }
);

//! Step-6, Create a async thunk for deleting a product
const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  //! Get the id of the product
  async (id) => {
    const result = await axios.delete(
      //! Dynamically pass the id (we will update the id)
      `http://localhost:5000/api/admin/products/delete/${id}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  }
);

//! Step-1, Create a Slice
const adminProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default adminProductSlice.reducer;

export { addNewProduct, fetchAllProducts, editProduct, deleteProduct };
