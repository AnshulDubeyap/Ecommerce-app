
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    productList: [],
}

export const fetchAllFilteredProducts = createAsyncThunk(
    "product/fetchAllProducts",
    async ({filterParams, sortParams}) => {

        const query = new URLSearchParams({ ...filterParams, SortBy: sortParams }).toString();

        const result = await axios.get(`http://localhost:5000/api/shop/products/get?${query}`);
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
        });
    },
});

export default shoppingProductsSlice.reducer;