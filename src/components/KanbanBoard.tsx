import { Button, Card, Checkbox, ColorPicker, Input, Space } from "antd";
import { Board, addTaskToCategory, createCategory } from "../store/BoardSlice";
import { useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import "./KanbanBoard.css";

export default function KanbanBoard(props: any): JSX.Element {
  const board: Board = props.board;

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#F0E7F6");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  function handleCreateCategory() {
    console.log({ title: categoryTitle, id: board.categories ? board.categories.length : 0 });
    dispatch(createCategory({ tasks: [], title: categoryTitle, color: categoryColor, id: board.categories ? board.categories.length : 0 }));
    setCategoryTitle("");
  }

  function handleAddTask(categoryId: number) {
    console.log(categoryId);
    dispatch(addTaskToCategory({ categoryId: categoryId, task: { task: taskTitle, id: board.categories ? board.categories[categoryId].tasks?.length : 0 } }));
    console.log("board vategories", board.categories ? board.categories[categoryId].tasks : null);
    setTaskTitle("");
  }

  return (
    <div className="board">
      <h1>{board.title}</h1>
      <h3>{board.subtitle}</h3>

      <div className="board-container">
        {board.categories?.map((category) => {
          return (
            <div className="category-container" key={category.id}>
              <h4 style={{ backgroundColor: category.color }}>{category.title}</h4>
              <Card style={{ padding: "0rem" }} className="card">
                {category.tasks?.map((task) => {
                  return <Checkbox indeterminate key={task.id}>{task.task}</Checkbox>;
                })}
                <Space.Compact style={{ height: "4vh" }}>
                  <Input placeholder="Add new task" value={taskTitle} onChange={event => setTaskTitle(event.target.value)} />
                  <Button style={{ height: "4vh" }} type="primary" onClick={() => handleAddTask(category.id)}>Create</Button>
                </Space.Compact>        
              </Card>
            </div>
          );
        })}
        <div className="new-category-container">
          <Space.Compact className="new-category-input" style={{ height: "4%" }}>
            <Input placeholder="Create a new category" value={categoryTitle} onChange={event => setCategoryTitle(event.target.value)}/>
            <Button style={{ height: "4%" }} type="primary" onClick={handleCreateCategory}>Create</Button>
          </Space.Compact>
          <div style={{ display: "flex"}}>
            <ColorPicker defaultValue={"#F0E7F6"} showText value={categoryColor} onChangeComplete={value => setCategoryColor(value.toHexString())} />
          </div>
        </div>
      </div>
    </div>
  );
}
