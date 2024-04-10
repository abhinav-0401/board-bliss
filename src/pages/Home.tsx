import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/TypedStore";
import { User, logout } from "../store/UserSlice";
import { Board, addTaskToCategory, createCategory } from "../store/BoardSlice";
import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";

export default function Home(): JSX.Element {
  const user: User = useAppSelector(state => state.user);
  const board: Board = useAppSelector(state => state.board);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");

  function handleCreateCategory() {
    console.log({ title: categoryTitle, id: board.categories ? board.categories.length : 0 });
    dispatch(createCategory({ tasks: [], title: categoryTitle, id: board.categories ? board.categories.length : 0 }));
  }

  function handleAddTask(categoryId: number) {
    console.log(categoryId);
    dispatch(addTaskToCategory({ categoryId: categoryId, task: { task: taskTitle, id: board.categories ? board.categories[categoryId].tasks?.length : 0 } }));
    console.log("board vategories", board.categories ? board.categories[categoryId].tasks : null);
  }

  function handleLogout(): void {
    console.log("logout was clicked");
    dispatch(logout());
    console.log(user);
    navigate("/signup");
  }

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        {/* <h2>This is the home page</h2>
        <h3>{user.username}</h3>
        <h3>{user.password}</h3> */}

        {/* <input type="text" name="username" onChange={event => setCategoryTitle(event.target.value)} />
        <h3>{categoryTitle}</h3>
        <button onClick={handleCreateCategory}>Create new category</button> */}

        <KanbanBoard board={board} />

        {/* <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {board.categories?.map((category) => {
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }} key={category.id}>
                <h2>{category.title}</h2>
                <input type="text" name="task" onChange={event => setTaskTitle(event.target.value)} />
                <h3>{taskTitle}</h3>
                <button onClick={() => handleAddTask(category.id)}>Add task</button>
                  {category.tasks?.map((task) => {
                    return <div key={task.id}><h3>{task.task}</h3></div>;
                })}
              </div>
            );
          })}
        </div> */}
      </div>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </>
  );
}