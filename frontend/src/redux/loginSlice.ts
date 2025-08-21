import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services";

export const loginUser = createAsyncThunk("/login/signin", async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
});

const initialState = {
  isLaoding: false,
  error: "",
  isSuccess: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearLogin: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLaoding = true;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLaoding = false;
        state.isSuccess = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("error", action);
        state.isLaoding = false;
        state.error = "failed to register";
      });
  },
});

export const { clearLogin } = loginSlice.actions;
export default loginSlice.reducer;
