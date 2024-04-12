import { Button, Input } from "antd";
import { Category, Subtask, Task, deleteSubtask } from "../store/BoardSlice";
import { CloseOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks/TypedStore";
import { useEffect } from "react";

export default function KanbanSubtask(props: any): JSX.Element {
  const subtask: Subtask = props.subtask;
  const task: Task = props.task;
  const category: Category = props.category;
  const editedTask: Task = props.editedTask;

  const setEditedTask: React.Dispatch<React.SetStateAction<Task>> = props.setEditedTask;

  const dispatch = useAppDispatch();
  let editSubtask = subtask.value;

  useEffect(() => {
    editSubtask = props.subtask.value;
  }, [props.subtask]);

  useEffect(() => {
    setEditedTask(props.editedTask);
  }, [props.editedTask]);

  function handleDeleteSubtask(subtaskId: number): void {
    dispatch(deleteSubtask({
      categoryId: category.id,
      taskId: task.id,
      subtaskId,
    }));
  }

  function handleEditSubtask(event: React.ChangeEvent<HTMLInputElement>, subtaskId: number): void {
    const newEditedTask = structuredClone(editedTask);
    editSubtask = event.target.value;

    if (newEditedTask.subtasks) {
      newEditedTask.subtasks[subtaskId].value = editSubtask;
    }
    setEditedTask(newEditedTask);
  }

  return (
    <div className="edit-subtask" key={subtask.id}>
      <Input value={editSubtask} style={{ height: "4vh" }} onChange={e => handleEditSubtask(e, subtask.id)} />
      <Button onClick={() => handleDeleteSubtask(subtask.id)} type="text" ><CloseOutlined /></Button>
    </div>
  );
}