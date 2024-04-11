
import { useAppSelector } from "../hooks/TypedStore";
import { Board } from "../store/BoardSlice";
import KanbanBoard from "../components/KanbanBoard";

export default function Home(): JSX.Element {
  const board: Board = useAppSelector(state => state.board);

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        
        <KanbanBoard board={board} />

      </div>
    </>
  );
}