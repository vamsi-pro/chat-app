import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services";

const initialState = {
  user: null,
  authenticated: false,
  loading: true,
  error: "",
};

export const checkAuth = createAsyncThunk("authSlice/checkAuth", async () => {
  const response = await axiosInstance.get("/auth/check");
  return response.data;
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authReducer: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.error = action.error.message ?? "";
        state.loading = false;
        state.authenticated = false;
      });
  },
});

export const { authReducer } = authSlice.actions;
export default authSlice.reducer;
