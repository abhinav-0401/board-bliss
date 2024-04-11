import { Button, Card, Checkbox, Input, Menu, MenuProps, Modal, Space } from "antd";
import { Board, Category, Subtask, Task, addSubtaskToTask, deleteTask, editTask } from "../store/BoardSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import { MenuInfo } from "rc-menu/lib/interface";
import KanbanSubtask from "./KanbanSubtask";

export default function KanbanTask(props: any): JSX.Element {
  const task: Task = props.task;
  const category: Category = props.category;
  const board: Board = props.board;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  
  const [subtaskValue, setSubtaskValue] = useState<string>("");

  const [editedTask, setEditedTask] = useState<Task>(props.task);

  useEffect(() => {
    setEditedTask(props.task);
    console.log("editedTask", editedTask);
  }, [props.task]);

  const dispatch = useAppDispatch();

  function showModal(e: React.MouseEvent): void {
    e.stopPropagation();
    setIsModalOpen(true);
  }

  function handleModalClose(e: React.MouseEvent, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void {
    e.stopPropagation();
    console.log("handleEditClose called");
    setModalOpen(false);
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

  const editMenuItems: MenuProps["items"] = [
    {
      label: "Options",
      key: "editMenu",
      children: [
        {
          label: "Edit task",
          key: "edit",
          onClick: showTaskEdit,
        },
        {
          label: "Delete task",
          key: "delete",
          onClick: handleTaskDelete,
        }
      ],
    }
  ];

  function showTaskEdit(menuinfo: MenuInfo): void {
    menuinfo.domEvent.stopPropagation();
    setIsModalOpen(false);
    setIsEditModalOpen(true);
  }

  function handleTaskEdit(e: React.MouseEvent): void {
    dispatch(editTask({
      categoryId: category.id,
      taskId: task.id,
      editedTask,
    }));
    e.stopPropagation();
    setIsEditModalOpen(false);
  }

  function handleTaskDelete(menuInfo: MenuInfo): void {
    menuInfo.domEvent.stopPropagation();
    setIsModalOpen(false);
    dispatch(deleteTask({
      categoryId: category.id,
      taskId: task.id,
    }));
  }

  return (
    <Card style={{ padding: "0rem" }} className="card" key={task.id} onClick={showModal}>
      <h3>{task.title}</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {task.subtasks?.map((subtask) => {
          return (
            <Checkbox key={subtask.id} indeterminate>{subtask.value}</Checkbox>
          );
        })}
      </div>

      <Modal 
        closeIcon={false} 
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )} 
        className="task-modal" 
        open={isModalOpen} 
        onOk={e => handleModalClose(e, setIsModalOpen)}
        onCancel={e => handleModalClose(e, setIsModalOpen)} 
      >
        <header>
          <div>{task.title}</div>
          <Menu mode="vertical" items={editMenuItems} />
        </header>
        <Space.Compact style={{ height: "4vh" }}>
          <Input placeholder="Add new task" value={subtaskValue} onClick={e => console.log(e.target)} onChange={event => setSubtaskValue(event.target.value)} />
          <Button style={{ height: "4vh" }} type="primary" onClick={(e) => {
            e.stopPropagation();
            handleAddSubtask(task.id);
          }}>Create</Button>
        </Space.Compact>
      </Modal>

      <Modal
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )} 
        className="edit-modal"
        open={isEditModalOpen}
        onOk={e => handleTaskEdit(e)} 
        onCancel={e => handleModalClose(e, setIsEditModalOpen)}
      >
        <div>Edit Task Title:</div>
        <Input value={editedTask.title} onChange={event => setEditedTask({
          ...editedTask,
          title: event.target.value,
        })} />
  
        {editedTask.subtasks?.map(subtask => {
          console.log("subtask", subtask);
          return (
            <KanbanSubtask key={subtask.id} subtask={subtask} task={task} category={category} editedTask={editedTask} setEditedTask={setEditedTask} />
          );
        })}
      </Modal>  

    </Card>
  );
}