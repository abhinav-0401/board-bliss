import { Button, ColorPicker, Input, Space } from "antd";
import { Board, addLabel, createCategory } from "../store/BoardSlice";
import { useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import "./KanbanBoard.css";
import KanbanCategory from "./KanbanCategory";

export default function KanbanBoard(props: any): JSX.Element {
  const board: Board = props.board;

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#F0E7F6");

  const [labelTitle, setLabelTitle] = useState<string>("");
  const [labelColor, setLabelColor] = useState<string>("#FFDCE0");

  const dispatch = useAppDispatch();

  function handleCreateCategory(): void {
    console.log({ title: categoryTitle, id: board.categories ? board.categories.length : 0 });
    dispatch(createCategory({ tasks: [], title: categoryTitle, color: categoryColor, id: board.categories ? board.categories.length : 0 }));
    setCategoryTitle("");
  }

  function handleCreateLabel(): void {
    dispatch(addLabel({ value: labelTitle, color: labelColor, id: board.labels.length }));
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

        <div className="new-label-container">
          <Space.Compact className="new-label-input" style={{ height: "4%" }}>
            <Input placeholder="Create a new label" value={labelTitle} onChange={event => setLabelTitle(event.target.value)} />
            <Button style={{ height: "4%" }} type="primary" onClick={handleCreateLabel}>Create</Button>
          </Space.Compact>
          <div style={{ display: "flex" }}>
            <ColorPicker defaultValue={"#F0E7F6"} showText value={labelColor} onChangeComplete={value => setLabelColor(value.toHexString())} />
          </div>
        </div>
      </div>
    </div>
  );
}
