import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Subtask {
  id: number;
  value: string;
  isDone: boolean;
}

export interface Task {
  id: number;
  title: string;
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
    },
    addSubtaskToTask: (state, action) => {
      console.log(action.payload);
      const category = state.categories && state.categories[action.payload.categoryId];
      category?.tasks && category.tasks[action.payload.taskId].subtasks?.push(action.payload.subtask);
    },
    editTask: (state, action) => {
      console.log(action.payload);
      const category = state.categories && state.categories[action.payload.categoryId];
      if (category?.tasks && category.tasks[action.payload.taskId]) {
        category.tasks[action.payload.taskId] = action.payload.editedTask;
      }
    },
    deleteTask: (state, action) => {
      console.log(action.payload);
      const category = state.categories && state.categories[action.payload.categoryId];
      category?.tasks?.splice(action.payload.taskId, 1);
      if (category?.tasks) {
        // assigning new IDs since the positions have changed and the IDs are reflective of their positions
        for (let i = 0; i < category.tasks.length; ++i) {
          category.tasks[i].id = i;
        }
      }
    },
    deleteSubtask: (state, action) => {
      console.log(action.payload);
      const category = state.categories && state.categories[action.payload.categoryId];
      const task = category?.tasks && category.tasks[action.payload.taskId];
      task?.subtasks?.splice(action.payload.subtaskId, 1);
      if (task?.subtasks) {
        // same ID re-assignment we did in deleteTask
        for (let i = 0; i < task.subtasks.length; ++i) {
          task.subtasks[i].id = i; 
        }
      }
    }
  },
});

export const {
  createBoard,
  createCategory,
  addTaskToCategory,
  addSubtaskToTask,
  editTask,
  deleteTask,
  deleteSubtask,
} = boardSlice.actions;

export default boardSlice.reducer;