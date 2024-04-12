import { Button, Card, Checkbox, Dropdown, Input, Menu, MenuProps, Modal, Space } from "antd";
import { Board, Category, Subtask, Task, addLabelToTask, addSubtaskToTask, deleteTask, editTask, toggleSubtaskDone } from "../store/BoardSlice";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import { MenuInfo } from "rc-menu/lib/interface";
import KanbanSubtask from "./KanbanSubtask";
import { DownOutlined } from "@ant-design/icons";
import KanbanLabel from "./KanbanLabel";

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
  }, [props.task]);

  const dispatch = useAppDispatch();

  function showModal(e: React.MouseEvent): void {
    e.stopPropagation();
    setIsModalOpen(true);
  }

  function handleModalClose(e: React.MouseEvent, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void {
    e.stopPropagation();
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
    // setIsModalOpen(false);
    setSubtaskValue("");
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

  function handleSubtaskDone(e: React.MouseEvent, subtaskId: number, isDone: boolean) {
    e.stopPropagation();
    dispatch(toggleSubtaskDone({
      isDone,
      categoryId: category.id,
      taskId: task.id,
      subtaskId,
    }));
  }

  const items: MenuProps['items'] = [];

  for (const label of board.labels) {
    items.push({
      label: label.value,
      key: `${label.id}`,
    });
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    
    if (task.labels.length >= 1) {
      for (let label of task.labels) {
        if (label.id == Number(key)) { // already been added to this task
          alert("already added");
          return;
        } 
      }
    }
    dispatch(addLabelToTask({
      categoryId: category.id,
      taskId: task.id,
      label: board.labels[Number(key)],
    }));
  };

  return (
    <Card style={{ padding: "0rem" }} className="card" key={task.id} onClick={showModal}>
      <h3>{task.title}</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {task.subtasks?.map((subtask) => {

          return (
            <div className="check-container" onClick={e => handleSubtaskDone(e, subtask.id, !subtask.isDone)}>
              <input type="checkbox" id={subtask.value} checked={subtask.isDone} className="check" key={subtask.id} />
              <label htmlFor={subtask.value}>{subtask.value}</label>
            </div>
          );
        })}

        <div className="label-list-container">
          {task.labels.map(label => {
            return (
              <KanbanLabel label={label} />
            );
          })}
        </div>
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
        <header className="task-modal-header">
          <h3>{task.title}</h3>
          <Menu mode="vertical" items={editMenuItems} />
        </header>

        <div className="task-modal-body">

          <div className="task-modal-subtask-container">
            <h4>Add a new subtask:</h4>
            <Space.Compact style={{ height: "4vh" }}>
              <Input allowClear placeholder="Add new subtask" value={subtaskValue} onChange={event => setSubtaskValue(event.target.value)} />
              <Button style={{ height: "4vh" }} type="default" onClick={(e) => {
                e.stopPropagation();
                handleAddSubtask(task.id);
              }}>Create</Button>
            </Space.Compact>
          </div>
          

          <Dropdown menu={{ items, onClick }} trigger={['click']}>
            <a onClick={(e) => {
              e.stopPropagation();
            }}>
              <Space>
                Add Label to Task
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>

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
        <header>
          <h3>Edit Task Title:</h3>
          <Input allowClear style={{ height: "4vh"}} value={editedTask.title} onChange={event => setEditedTask({
            ...editedTask,
            title: event.target.value,
          })} />
        </header>
        
        <div className="edit-modal-body">
          <h4>Edit Subtasks</h4>
          {editedTask.subtasks?.map(subtask => {
            return (
              <KanbanSubtask key={subtask.id} subtask={subtask} task={task} category={category} editedTask={editedTask} setEditedTask={setEditedTask} />
            );
          })}
        </div>
        
      </Modal>  

    </Card>
  );
}