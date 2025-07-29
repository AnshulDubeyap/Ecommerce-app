
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async ({filterParams, sortParams}) => {

        const query = new URLSearchParams({ ...filterParams, SortBy: sortParams }).toString();

        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
        return result.data;
    }
);

export const fetchProductDetails = createAsyncThunk(
    "product/fetchProductDetails",
    async (id) => {
        const result = await axios.get(`http://localhost:5000/api/shop/products/get/${id}`);
        return result.data;
    }
);

const shoppingProductsSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.productList = action.payload.data;
        });
        builder.addCase(fetchAllFilteredProducts.rejected, (state) => {
            state.isLoading = false;
            state.productList = [];
        })
        builder.addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.productDetails = action.payload.data;
        });
        builder.addCase(fetchProductDetails.rejected, (state) => {
            state.isLoading = false;
            state.productDetails = null;
        })
    },
});

export default shoppingProductsSlice.reducer;