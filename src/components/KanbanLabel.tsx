import { Label } from "../store/BoardSlice";

export default function KanbanLabel({ label }: { label: Label }): JSX.Element {

  return (
    <div key={label.id} className="label-container" style={{ backgroundColor: label.color }}>{label.value}</div>
  );
}