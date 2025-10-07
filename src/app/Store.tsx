import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/UserApi.js";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(userApi.middleware),
});
