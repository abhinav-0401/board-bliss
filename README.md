# Welcome to Board Bliss!

Board Bliss is a simple Kanban board app built with React, TypeScript and Redux.

### Board bliss supports:

### 1. Authentication:
  - Sign up and log out
  - Users cannot access the kanban board if they are not signed in
  - Sign up and log out is carried using Redux
### 2. Categories:
  - Users can add a category, with a color of their liking :)
  - Tasks are divided by categories
  - Categories can be edited and deleted by **clicking** on them
### 3. Tasks: 
  - Users can add tasks to a category
  - Tasks can be edited and deleted by **clicking** on them
  - Subtasks can be added to a task, which can be edited and removed too. All from a single modal, accessed by clicking a task.
### 4. Labels:
  - Users can create labels with custom colors and titles, like a "Due on 4/11" label with Lavender colour.
  - These labels can be then added to tasks by clicking on the tasks.
  - The labels created by the user can be seen by visiting the the profile drawer, which opens on clicking the **View Profile** button on the top right
### 5. Filter by Labels:
  - By clicking the button on the top right, the user can open a drawer that let them filter for tasks by the labels they have created. If, for example, a label called "late" has been created, then typing "late" will filter out the tasks that have been assigned this label.
### 6. Search for Tasks: 
  - Similar to Filter by Labels, Search for Tasks helps users search for a specific task.

```
NOTE: The searches for Filter by Labels and Search for Tasks stack on top of each other.
```

# Installation

1. Clone the repo.
2. Once you are in the `board-bliss/` directory, run:
```
npm i
```
3. Once all the dependencies are installed, you can locally run the project by running:
```
npm run dev
```
4. The default port for deployment is `localhost:5173`.

# Approach to the Project

I approached the project in a fairly top-down way. instead of a bottom-up one.

I had a few things clear in my mind:

1. I was going to use TypeScript. I love static typing, and more than that, I appreciate the benefits it gives me and the runtime errors it saves me from. No JavaScript here.

2. Once the project was set up, with redux, react-router, etc, I would also set up a component library. This project had a short deadline, and I had a few hours to work with. I didn't want to re-invent the wheel for everything. I wrote most of the HTML + CSS by myself in the end, but it was still helpful.

3. **The first step I needed to take was defining the types required. How was a Board type going to look like? What is a Category? I had to define these first.**

I spent the first couple of days defining the basic types, setting up routing, defining the hook that checks whether the user is signed in when visiting a route like `/home`.

Then, I set up the first few reducers for the Board. Started giving shape to the UI. Connected it to the reducers. The parts where I had to fill in the design by myself were also incredibly fun, since I had to ensure a consistent style but I could also take liberties there.

### I settled early on in the project on this folder structure: 
```
src/
  assets/
  components/
  hooks/
  pages/
  providers/
  store/
  App.css
  App.tsx
  main.tsx
```

- `/assets` -> For ***assets*** like images
- `/components` -> For components displayed as part of pages, like Task, Subtask, Category, etc.
- `/hooks` -> For custom hooks.
- `/pages` -> Each `.tsx` file within this folder represents a route in the app
- `/providers` -> For App providers like Route providers and Store Providers. Currently holds a single `<AppProvider />` component encompassing all providers being used.
- `/store` -> For Redux store slices, which include their reducers, and the `Store.ts` file where all the slices are merged.