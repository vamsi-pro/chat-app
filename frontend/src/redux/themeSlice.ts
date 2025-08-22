import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "retro",
};

const themeSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
