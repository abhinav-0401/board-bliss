import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Task } from "./BoardSlice";

export interface Category {
  title: string;
  subtitle?: string;
  tasks?: Task[];
}

const initialState: Category = {
  title: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks?.push(action.payload);
    },
  },
});

