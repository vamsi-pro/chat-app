import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services";

export const registerUser = createAsyncThunk(
  "/register/signup",
  async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLaoding: false,
    error: "",
    isSuccess: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLaoding = true;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLaoding = false;
        state.isSuccess = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("error", action);
        state.isLaoding = false;
        state.error = "failed to register";
      });
  },
});

export const {} = registerSlice.actions;
export default registerSlice.reducer;
