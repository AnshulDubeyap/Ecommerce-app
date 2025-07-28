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
    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

//! Create a async thunk for user authentication(Login)
const loginUser = createAsyncThunk(
    "/auth/login",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

//! Create a async thunk for user authentication(Logout)
const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/logout",
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

//! Creating a async thunk for middleware(cookies)
const checkAuth = createAsyncThunk(
    "/auth/check-auth",
    async () => {
        const response = await axios.get(
            "http://localhost:5000/api/auth/check-auth",
            {
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    }
);

//! Step-1, Create a Slice, Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log("Login successful:", action.payload);
                state.user = action.payload.success ? { ...action.payload.user, userName: action.payload.user.userName } : null;
                state.isAuthenticated = action.payload.success ? true : false;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user ? { ...action.payload.user, userName: action.payload.user.userName } : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

//! Step-3, Export the Reducer and action
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
export { registerUser, loginUser, checkAuth, logoutUser };
