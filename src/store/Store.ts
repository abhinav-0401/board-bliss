import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import boardReducer from "./BoardSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;