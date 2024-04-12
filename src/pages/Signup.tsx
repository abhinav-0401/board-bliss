import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { Button, Card, Input, } from "antd";

export default function Signup(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailStatus, setEmailStatus] = useState<"" | "error">("");
  const [passwordStatus, setPasswordStatus] = useState<"" | "error">("");
  const [usernameStatus, setUsernameStatus] = useState<"" | "error">("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    return usernameRegex.test(username);
  }

  function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[!@_\-?]).{8,}$/;
    return passwordRegex.test(password);
  }

  function validate(): boolean {
    if (!validateEmail(email) || !validatePassword(password) || !validateUsername(username)) {
      return false;
    }
    return true;
  }

  function handleSignup(): void {

    if (!validateEmail(password)) { 
      setEmailStatus("error");
    } else if (emailStatus === "error") { setEmailStatus(""); }

    if (!validatePassword(password)) {
      setPasswordStatus("error");
    } else if (passwordStatus === "error") { setPasswordStatus(""); }

    if (!validateUsername(username)) {
      setUsernameStatus("error");
    } else if (usernameStatus === "error") { setUsernameStatus(""); }

    if (!validate()) { return; }

    dispatch(signup({ username, password, email }));
    navigate("/home");
  }

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <div className="signup-header">
          <h2>Sign up to Board-Bliss</h2>
          <h3>Your new, minimalist Kanban board</h3>
        </div>
        
        <div className="signup-content">
          <Input status={emailStatus} placeholder="Enter your email" value={email} onChange={event => setEmail(event.target.value)} />
          {emailStatus === "error" ? <div>Incorrect email format</div> : null}

          <Input status={usernameStatus} placeholder="Choose your username" value={username} onChange={event => setUsername(event.target.value)} />
          {usernameStatus === "error" ? <div>Incorrect username format. Must be between  3 - 16 characters long, and have letters, digits or underscores.</div> : null}

          <Input status={passwordStatus} placeholder="Create a password" value={password} onChange={event => setPassword(event.target.value)} />
          {passwordStatus === "error" ? <div>Incorrect password format. Must be atleast 8 characters long and have atleast one uppercase letter, one lowercase letter, one special character and one digit.</div> : null}

          <Button style={{ height: "4vh", width: "12vw" }} type="default" onClick={handleSignup}>Signup</Button>
        </div>
      </Card>
    </div>
  );
}