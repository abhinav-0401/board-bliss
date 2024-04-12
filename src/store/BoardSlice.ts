import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Label {
  value: string;
  color: string;
  id: number;
}

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
  labels: Label[];
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
  labels: Label[];
  taskFilter?: string;
  taskSearch?: string;
}

export interface Kanban {
  boards: Board[];
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
  labels: [],
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // createBoard: (state, action: PayloadAction<Board>) => {
    //   // state.boards.push(action.payload);
    // },
    editBoard: (state, action) => {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
    },
    createCategory: (state, action) => {
      state.categories?.push(action.payload);
      // state.boards[action.payload.boardId].categories?.push(action.payload);
    },
    editCategory: (state, action) => {
      const category = state.categories && state.categories[action.payload.categoryId];
      if (category) { 
        category.title = action.payload.categoryTitle;
      }
    },
    deleteCategory: (state, action) => {
      state.categories?.splice(action.payload.categoryId, 1);
      if (state.categories) {
        for (let i = 0; i < state.categories.length; ++i) {
          state.categories[i].id = i;
        }
      }
    },
    addTaskToCategory: (state, action) => {
      state.categories && state.categories[action.payload.categoryId].tasks?.push(action.payload.task);
    },
    addSubtaskToTask: (state, action) => {
      const category = state.categories && state.categories[action.payload.categoryId];
      category?.tasks && category.tasks[action.payload.taskId].subtasks?.push(action.payload.subtask);
    },
    editTask: (state, action) => {
      const category = state.categories && state.categories[action.payload.categoryId];
      if (category?.tasks && category.tasks[action.payload.taskId]) {
        category.tasks[action.payload.taskId] = action.payload.editedTask;
      }
    },
    deleteTask: (state, action) => {
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
      const category = state.categories && state.categories[action.payload.categoryId];
      const task = category?.tasks && category.tasks[action.payload.taskId];
      task?.subtasks?.splice(action.payload.subtaskId, 1);
      if (task?.subtasks) {
        // same ID re-assignment we did in deleteTask
        for (let i = 0; i < task.subtasks.length; ++i) {
          task.subtasks[i].id = i; 
        }
      }
    },
    toggleSubtaskDone: (state, action) => {
      const category = state.categories && state.categories[action.payload.categoryId];
      const task = category?.tasks && category.tasks[action.payload.taskId];
      const subtask = task?.subtasks && task.subtasks[action.payload.subtaskId];
      if (subtask) {
        subtask.isDone = action.payload.isDone;
      }
    },
    addLabel: (state, action: PayloadAction<Label>) => {
      state.labels.push(action.payload);
    },
    addLabelToTask: (state, action) => {
      const category = state.categories && state.categories[action.payload.categoryId];
      const task = category?.tasks && category.tasks[action.payload.taskId];
      task?.labels.push(action.payload.label);
    },
    filterTask: (state, action) => {
      state.taskFilter = action.payload.taskFilter;
    },
    searchTask: (state, action) => {
      state.taskSearch = action.payload.taskSearch;
    },
  },
});

export const {
  // createBoard,
  editBoard,
  createCategory,
  editCategory,
  deleteCategory,
  addTaskToCategory,
  addSubtaskToTask,
  editTask,
  deleteTask,
  deleteSubtask,
  toggleSubtaskDone,
  addLabel,
  addLabelToTask,
  filterTask,
  searchTask,
} = boardSlice.actions;

export default boardSlice.reducer;