import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../features/alertSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    users: userReducer,
  },
});
