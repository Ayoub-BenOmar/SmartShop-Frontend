import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axiosConfig";

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const response = await api.post('auth/login', credentials);
    return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    await api.post('auth/logout');
    return;
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, role: null, isAuthenticated: false, loading: false, error: null },
    reducers: {
        // Keeping this for manual client-side cleanup if needed
        resetAuth: (state) => {
            state.user = null;
            state.role = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload; // Payload IS the user object
                state.role = action.payload.role;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Login failed";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            });
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;