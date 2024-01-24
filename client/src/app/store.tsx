import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../toolkit/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
