import { Button, Card, Checkbox, Input, Modal, Space } from "antd";
import { Board, Category, Subtask, Task, addSubtaskToTask } from "../store/BoardSlice";
import { useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";

export default function KanbanTask(props: any): JSX.Element {
  const task: Task = props.task;
  const category: Category = props.category;
  const board: Board = props.board;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subtaskValue, setSubtaskValue] = useState<string>("");

  const dispatch = useAppDispatch();

  function showModal() {
    setIsModalOpen(true);
  }

  function handleClose(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("handleClose called");
    setIsModalOpen(false);
  }

  function handleAddSubtask(taskId: number): void {
    dispatch(addSubtaskToTask({
      categoryId: category.id,
      taskId: taskId,
      subtask: {
        value: subtaskValue,
        id: task.subtasks ? task.subtasks?.length : 0,
        isDone: false,
      } as Subtask,
    }));
    setIsModalOpen(false);
  }

  return (
    <Card style={{ padding: "0rem" }} className="card" key={task.id} onClick={showModal}>
      <h3>{task.title}</h3>
      {/* <Checkbox indeterminate>{task.title}</Checkbox> */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {task.subtasks?.map((subtask) => {
          return (
            <Checkbox indeterminate>{subtask.value}</Checkbox>
          );
        })}
      </div>

      <Modal open={isModalOpen} onOk={e => handleClose(e)} onCancel={e => handleClose(e)}>
        <Space.Compact style={{ height: "4vh" }}>
          <Input placeholder="Add new task" value={subtaskValue} onChange={event => setSubtaskValue(event.target.value)} />
          <Button style={{ height: "4vh" }} type="primary" onClick={() => handleAddSubtask(task.id)}>Create</Button>
        </Space.Compact>
      </Modal>
    </Card>
  );
}