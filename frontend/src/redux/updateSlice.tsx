import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../services";

export const updateProfile = createAsyncThunk(
  "/update/profile",
  async (userData) => {
    const response = await axiosInstance.put("/auth/update", userData);
    return response.data;
  }
);

const initialState = {
  isUpdatingProfile: false,
  error: "",
  isSuccess: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    clearLogin: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
        state.error = "";
        state.isSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.isSuccess = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        console.log("error", action);
        state.isUpdatingProfile = false;
        state.error = "failed to register";
      });
  },
});

export const { clearLogin } = updateSlice.actions;
export default updateSlice.reducer;
