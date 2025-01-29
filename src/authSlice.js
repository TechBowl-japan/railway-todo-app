import { createSlice } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

const cookie = new useCookies();

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
