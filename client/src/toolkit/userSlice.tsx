import { createSlice } from "@reduxjs/toolkit";

// Get the initial user from local storage
const stringUser = localStorage.getItem("user");
const userObj = JSON.parse(stringUser as string) || null;

// Slice based on logged user
const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: {
    user: userObj || null,
  },
  reducers: {
    addLoggedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addLoggedUser } = loggedUserSlice.actions;

export default loggedUserSlice.reducer;
