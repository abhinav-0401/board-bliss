import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Subtask {
  id: number;
  value: string;
  isDone: boolean;
}

export interface Task {
  id: number;
  task: string;
  description?: string;
  subtasks?: Subtask[];
}

export interface Category {
  id: number;
  title: string;
  color?: string;
  // subtitle?: string;
  tasks?: Task[];
}

export interface Board {
  title: string;
  subtitle?: string;
  categories?: Category[];
}

const initialState: Board = {
  title: "Personal",
  subtitle: "A board to keep track of personal tasks.",
  categories: [
    {
      id: 0,
      title: "Todo",
      color: "#E1E4E8",
      tasks: [],
    } as Category,
  ],
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
      console.log(action.payload);
      state.categories?.push(action.payload);
      console.log(state.categories);
    },
    addTaskToCategory: (state, action) => {
      console.log(action.payload);
      console.log("tasks: ", state.categories && state.categories[action.payload.categoryId].tasks);
      state.categories && state.categories[action.payload.categoryId].tasks?.push(action.payload.task);
    }
  },
});

export const { createBoard, createCategory, addTaskToCategory } = boardSlice.actions;

export default boardSlice.reducer;