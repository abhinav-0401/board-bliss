import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "./CategorySlice";

export interface Task {
  task: string;
  isDone: boolean;
}

export interface Board {
  title: string;
  subtitle?: string;
  categories?: Category[];
}

const initialState: Board = {
  title: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    createBoard: (state, action: PayloadAction<Board>) => {
      state.title = action.payload.title;
      if (action.payload.subtitle) {
        state.subtitle = action.payload.subtitle;
      }
    },
    createCategory: (state, action: PayloadAction<Category>) => {
      state.categories?.push(action.payload);
    },
  },
});

export const { createBoard } = boardSlice.actions;

export default boardSlice.reducer;