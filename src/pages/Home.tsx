import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/TypedStore";
import { User, logout } from "../store/UserSlice";
import { Board } from "../store/BoardSlice";

export default function Home(): JSX.Element {
  const user: User = useAppSelector(state => state.user);
  const board: Board = useAppSelector(state => state.board);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleLogout(): void {
    console.log("logout was clicked");
    dispatch(logout());
    console.log(user);
    navigate("/signup");
  }

  return (
    <>
      <div>
        <h2>This is the home page</h2>
        <h3>{user.username}</h3>
        <h3>{user.password}</h3>

        <h3>{board.title}</h3>
        <h3>{board.subtitle}</h3>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}