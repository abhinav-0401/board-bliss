import { useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import { Board, Category, Task, addTaskToCategory } from "../store/BoardSlice";
import KanbanTask from "./KanbanTask";
import { Button, Input, Space } from "antd";

export default function KanbanCategory(props: any): JSX.Element {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const board: Board = props.board;
  const category: Category = props.category;

  const dispatch = useAppDispatch();

  function handleAddTask(categoryId: number) {
    console.log(categoryId);
    dispatch(addTaskToCategory({
      categoryId: categoryId,
      task: {
        title: taskTitle, 
        id: board.categories ? board.categories[categoryId].tasks?.length : 0,
        subtasks: [],
      } as Task,
    }));
    console.log("board vategories", board.categories ? board.categories[categoryId].tasks : null);
    setTaskTitle("");
  }

  return (
    <div className="category-container" key={category.id}>
      <h4 style={{ backgroundColor: category.color }}>{category.title}</h4>
      {category.tasks?.map((task) => {
        return (
          <KanbanTask board={board} category={category} task={task} />
        );
      })}

      <Space.Compact style={{ height: "4vh" }}>
        <Input placeholder="Add new task" value={taskTitle} onChange={event => setTaskTitle(event.target.value)} />
        <Button style={{ height: "4vh" }} type="primary" onClick={() => handleAddTask(category.id)}>Create</Button>
      </Space.Compact>
    </div>
  );
}