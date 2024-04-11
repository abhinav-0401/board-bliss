import { Button, Card, Checkbox, ColorPicker, Input, Space } from "antd";
import { Board, addTaskToCategory, createCategory } from "../store/BoardSlice";
import { useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import "./KanbanBoard.css";
import Task from "./KanbanTask";
import KanbanTask from "./KanbanTask";
import KanbanCategory from "./KanbanCategory";

export default function KanbanBoard(props: any): JSX.Element {
  const board: Board = props.board;

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#F0E7F6");

  const dispatch = useAppDispatch();

  function handleCreateCategory() {
    console.log({ title: categoryTitle, id: board.categories ? board.categories.length : 0 });
    dispatch(createCategory({ tasks: [], title: categoryTitle, color: categoryColor, id: board.categories ? board.categories.length : 0 }));
    setCategoryTitle("");
  }


  return (
    <div className="board">
      <h1>{board.title}</h1>
      <h3>{board.subtitle}</h3>

      <div className="board-container">
        {board.categories?.map((category) => {
          return (
            <KanbanCategory key={category.id} board={board} category={category} />
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
