import { useState } from "react";
import { useAppDispatch } from "../hooks/TypedStore";
import { Board, Category, Task, addTaskToCategory, deleteCategory, editCategory } from "../store/BoardSlice";
import KanbanTask from "./KanbanTask";
import { Button, Input, Modal, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function KanbanCategory(props: any): JSX.Element {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const board: Board = props.board;
  const category: Category = props.category;

  const dispatch = useAppDispatch();

  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState<boolean>(false);

  const [categoryTitle, setCategoryTitle] = useState<string>("");

  function handleAddTask(categoryId: number) {
    console.log(categoryId);
    dispatch(addTaskToCategory({
      categoryId: categoryId,
      task: {
        title: taskTitle, 
        id: board.categories ? board.categories[categoryId].tasks?.length : 0,
        subtasks: [],
      } as Task,
    }));
    console.log("board vategories", board.categories ? board.categories[categoryId].tasks : null);
    setTaskTitle("");
  }

  function handleModalClose(e: React.MouseEvent, setModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void {
    e.stopPropagation();
    console.log("handleEditClose called");
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
      {category.tasks?.map((task) => {
        return (
          <KanbanTask key={task.id} board={board} category={category} task={task} />
        );
      })}

      <Space.Compact style={{ height: "4vh" }}>
        <Input placeholder="Add new task" value={taskTitle} onChange={event => setTaskTitle(event.target.value)}
          onClick={e => e.stopPropagation()}
        />
        <Button style={{ height: "4vh" }} type="primary" onClick={(e) => {
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
        <Space.Compact style={{ height: "4vh" }}>
          <Input placeholder="Edit Category Name" value={categoryTitle} onChange={event => setCategoryTitle(event.target.value)} />
          <CloseOutlined onClick={handleCategoryDelete} />
        </Space.Compact>
      </Modal>
    </div>
  );
}