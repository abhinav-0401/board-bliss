import { Button, ColorPicker, Input, Modal, Space } from "antd";
import { Board, addLabel, createCategory, editBoard } from "../store/BoardSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import "./KanbanBoard.css";
import KanbanCategory from "./KanbanCategory";

const { TextArea } = Input;

export default function KanbanBoard(props: any): JSX.Element {
  const board: Board = props.board;

  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryColor, setCategoryColor] = useState<string>("#F0E7F6");

  const [labelTitle, setLabelTitle] = useState<string>("");
  const [labelColor, setLabelColor] = useState<string>("#FFDCE0");

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  function handleModalClose(e: React.MouseEvent, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void {
    e.stopPropagation();
    console.log("handleEditClose called");
    setModalOpen(false);
  }

  const dispatch = useAppDispatch();

  const [editedBoard, setEditedBoard] = useState<Board>(props.board);

  useEffect(() => {
    setEditedBoard(props.board);
  }, [props.board]);

  function handleCreateCategory(): void {
    dispatch(createCategory({ tasks: [], title: categoryTitle, color: categoryColor, id: board.categories ? board.categories.length : 0 }));
    setCategoryTitle("");
  }

  function handleCreateLabel(): void {
    dispatch(addLabel({ value: labelTitle, color: labelColor, id: board.labels.length }));
    setLabelTitle("");
  }

  function handleBoardEdit(e: React.MouseEvent): void {
    e.stopPropagation();
    dispatch(editBoard(editedBoard));
    setIsEditModalOpen(false);
  }

  function showBoardEdit(): void {
    setIsEditModalOpen(true);
  }

  return (
    <div className="board">
      <h1 onClick={showBoardEdit}>{board.title}</h1>
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
            <Button style={{ height: "4%" }} type="default" onClick={handleCreateCategory}>Create</Button>
          </Space.Compact>
          <div style={{ display: "flex"}}>
            <ColorPicker defaultValue={"#F0E7F6"} showText={color => <span>Choose color ({color.toHexString()})</span>} value={categoryColor} onChangeComplete={value => setCategoryColor(value.toHexString())} />
          </div>
        </div>

        <div className="new-label-container">
          <Space.Compact className="new-label-input" style={{ height: "4%" }}>
            <Input placeholder="Create a new label" value={labelTitle} onChange={event => setLabelTitle(event.target.value)} />
            <Button style={{ height: "4%" }} type="default" onClick={handleCreateLabel}>Create</Button>
          </Space.Compact>
          <div style={{ display: "flex" }}>
            <ColorPicker defaultValue={"#F0E7F6"} showText={color => <span>Choose color ({color.toHexString()})</span>} value={labelColor} onChangeComplete={value => setLabelColor(value.toHexString())} />
          </div>
        </div>

        <Modal
          footer={(_, { OkBtn }) => (
            <>
              <OkBtn />
            </>
          )}
          className="edit-modal"
          open={isEditModalOpen}
          onOk={e => handleBoardEdit(e)}
          onCancel={e => handleModalClose(e, setIsEditModalOpen)}
        >
          <header>
            <h3>Edit Board Title:</h3>
            <Input style={{ height: "4vh" }} allowClear value={editedBoard.title} onChange={event => setEditedBoard({
              ...editedBoard,
              title: event.target.value,
            })} />
          </header>

          <div className="edit-modal-body">
            <h4>Edit Description of Board</h4>
            <TextArea value={editedBoard.subtitle} allowClear onChange={event => setEditedBoard({
              ...editedBoard,
              subtitle: event.target.value,
            })} />
          </div>
      </Modal>
      </div>
    </div>
  );
}
