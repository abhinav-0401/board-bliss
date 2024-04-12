import { Drawer, Input, Space, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/TypedStore";
import { useState } from "react";
import { Board, filterTask, searchTask } from "../store/BoardSlice";
import "./KanbanHeader.css";
import "./KanbanTask.css";
import { User, logout } from "../store/UserSlice";
import KanbanLabel from "./KanbanLabel";
import { useNavigate } from "react-router-dom";

export default function KanbanHeader(): JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const user: User  = useAppSelector(state => state.user);
  const board: Board = useAppSelector(state => state.board);

  const [taskFilter, setTaskFilter] = useState<string>("");
  const [taskSearch, setTaskSearch] = useState<string>("");

  const [openProfileDrawer, setOpenProfileDrawer] = useState<boolean>(false);
  const [openSearchDrawer, setOpenSearchDrawer] = useState<boolean>(false);

  const showProfileDrawer = () => {
    setOpenProfileDrawer(true);
  };

  const showSearchDrawer = () => {
    setOpenSearchDrawer(true);
  };

  const onClose = (setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>) => {
    setOpenDrawer(false);
  };

  return (
    <div className="header-container">
      <div>
        <Button type="text" style={{ backgroundColor: "#F0F0F0", }} className="view-profile-btn" onClick={showSearchDrawer}>
          Search and Filter Tasks 
        </Button>

        <Drawer placement="left" title="Search for Tasks and Filter Tasks by Labels" onClose={() => onClose(setOpenSearchDrawer)} open={openSearchDrawer}>

          <div className="header-search-container">

            <h4>Filter Tasks by Label:</h4>
            <Space.Compact style={{ height: "4vh" }}>
              <Input allowClear placeholder="Filter tasks by label" value={taskFilter} onChange={event => setTaskFilter(event.target.value)} />
              <Button style={{ height: "4vh" }} type="default" onClick={(e) => {
                e.stopPropagation();
                dispatch(filterTask({ taskFilter, }));
              }}>Create</Button>
            </Space.Compact>
            
            <h4>Search for Tasks:</h4>
            <Space.Compact style={{ height: "4vh" }}>
              <Input allowClear placeholder="Search for tasks by name" value={taskSearch} onChange={event => setTaskSearch(event.target.value)} />
              <Button style={{ height: "4vh" }} type="default" onClick={(e) => {
                e.stopPropagation();
                dispatch(searchTask({ taskSearch, }));
              }}>Create</Button>
            </Space.Compact>
          
          </div>

        </Drawer>

      </div>



      <div>
        <Button type="text" style={{ backgroundColor: "#F0F0F0", }} className="view-profile-btn" onClick={showProfileDrawer}>
          View Profile
        </Button>
        <Drawer title="Profile Details" onClose={() => onClose(setOpenProfileDrawer)} open={openProfileDrawer}>
          <h3>Hey {user.username}!</h3>
          <h4>Your email: {user.email}</h4>
          <Button type="default" onClick={() => {
            dispatch(logout());
            navigate("/signup");
          }}>Logout</Button>
          <hr />

          <h3>Labels Created: </h3>
          <div className="label-list-container">
            {board.labels.map(label => {
              return (
                <KanbanLabel label={label} />
              );
            })}
          </div>
        </Drawer>
      </div>
    </div>
  );
}