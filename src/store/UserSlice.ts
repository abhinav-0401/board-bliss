import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string | null;
  password: string | null;
}

const initialState: User = {
  username: null,
  password: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      console.log("payload: ", action.payload);
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logout: state => {
      console.log("user being logged out...");
      state.username = null;
      state.password = null;
    },
  },
});

export const { signup, logout } = userSlice.actions;

export default userSlice.reducer;