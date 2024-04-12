import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/TypedStore";
import { Board, Category, Task, addTaskToCategory, deleteCategory, editCategory, filterTask } from "../store/BoardSlice";
import KanbanTask from "./KanbanTask";
import { Button, Input, Modal, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function KanbanCategory(props: any): JSX.Element {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const board: Board = props.board;
  const category: Category = props.category;

  const dispatch = useAppDispatch();
  const taskFilter = useAppSelector(state => state.board.taskFilter);
  const taskSearch = useAppSelector(state => state.board.taskSearch);

  const filteredTasks = category?.tasks?.filter(task => {
    if (!taskFilter) { return true; }
    for (const label of task.labels) {
      if (label.value === taskFilter) { return true; }
    }
    return false;
  });

  const searchedTasks = filteredTasks?.filter(task => {
    if (!taskSearch) { return true; }
    if (task.title === taskSearch) { return true; }
    return false;
  })

  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState<boolean>(false);

  const [categoryTitle, setCategoryTitle] = useState<string>(category.title);

  function handleAddTask(categoryId: number) {
    dispatch(addTaskToCategory({
      categoryId: categoryId,
      task: {
        title: taskTitle, 
        id: board.categories ? board.categories[categoryId].tasks?.length : 0,
        subtasks: [],
        labels: [],
      } as Task,
    }));
    setTaskTitle("");
  }

  function handleModalClose(e: React.MouseEvent, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void {
    e.stopPropagation();
    setModalOpen(false);
  }

  function showCategoryEdit(e: React.MouseEvent): void {
    e.stopPropagation();
    setIsCategoryEditModalOpen(true);
  }

  function handleCategoryEdit(e: React.MouseEvent): void {
    dispatch(editCategory({
      categoryId: category.id,
      categoryTitle,
    }));
    e.stopPropagation();
    setIsCategoryEditModalOpen(false);
  }

  function handleCategoryDelete(e: React.MouseEvent): void {
    e.stopPropagation();
    setIsCategoryEditModalOpen(false);
    dispatch(deleteCategory({
      categoryId: category.id,
    }));
  }


  return (
    <div className="category-container" key={category.id} onClick={showCategoryEdit}>
      <h4 style={{ backgroundColor: category.color }}>{category.title}</h4>
      {searchedTasks?.map((task) => {
        return (
          <KanbanTask key={task.id} board={board} category={category} task={task} />
        );
      })}

      <Space.Compact style={{ height: "4vh" }}>
        <Input placeholder="Add new task" value={taskTitle} onChange={event => setTaskTitle(event.target.value)}
          onClick={e => e.stopPropagation()}
        />
        <Button style={{ height: "4vh" }} type="default" onClick={(e) => {
          e.stopPropagation();
          handleAddTask(category.id);
        }}>Create</Button>
      </Space.Compact>

      <Modal
        closeIcon={false}
        footer={(_, { OkBtn }) => (
          <>
            <OkBtn />
          </>
        )}
        className="task-modal"
        open={isCategoryEditModalOpen}
        onOk={handleCategoryEdit}
        onCancel={e => handleModalClose(e, setIsCategoryEditModalOpen)}
      >
        <div className="task-modal-body">
          <h3>{category.title}</h3>
          <div style={{ height: "4vh" }}>
            <Input placeholder="Edit Category Name" value={categoryTitle} onChange={event => setCategoryTitle(event.target.value)} />
            <CloseOutlined onClick={handleCategoryDelete} />
          </div>
        </div>
      </Modal>
    </div>
  );
}