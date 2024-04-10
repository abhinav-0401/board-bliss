import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import boardReducer from "./BoardSlice";
// import categoryReducer from "./CategorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    // category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;