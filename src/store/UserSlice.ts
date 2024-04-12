import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
}

const initialState: User = {
  username: null,
  email: null,
  password: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
    },
    logout: state => {
      state.username = null;
      state.password = null;
    },
  },
});

export const { signup, logout } = userSlice.actions;

export default userSlice.reducer;