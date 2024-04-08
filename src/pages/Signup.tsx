import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

export default function Signup(): JSX.Element {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignup(): void {
    dispatch(signup({ username, password }));
    console.log("signup button was clicked")
    navigate("/home");
  }

  return (
    <>
      <input type="text" name="username" onChange={event => setUsername(event.target.value)} />
      <h3>{username}</h3>
      <input type="text" name="password" onChange={event => setPassword(event.target.value)} />
      <h3>{password}</h3>
      <button onClick={handleSignup}>Sign up</button>
    </>
  );
}