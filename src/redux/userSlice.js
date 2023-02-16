import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    goto:true
  },
  reducers: {
    login: (state, action) => {
      console.log('Acrion', action.payload);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    gotoSignInSignUp:(state,action) => {
      state.goto = action.payload;
    }
  },
});

export const { login, logout,gotoSignInSignUp } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
