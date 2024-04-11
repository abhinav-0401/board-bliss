import { Button } from "antd";
import { useAppDispatch } from "../hooks/TypedStore";
import { createBoard } from "../store/BoardSlice";

export default function Sidebar(): JSX.Element {
  const dispatch = useAppDispatch();

  function handleCreateBoard() {
    dispatch(createBoard({
      title: "Personal",
      subtitle: "This is a personal board",
      labels: [],
    }));
  }
  
  return (
    <>
      <Button onClick={handleCreateBoard}>
        Create a new Board
      </Button>
    </>
  );
}