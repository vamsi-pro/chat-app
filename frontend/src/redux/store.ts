import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import updateReducer from "./updateSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    login: loginReducer,
    updateProfile: updateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
