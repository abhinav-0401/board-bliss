import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./TypedStore";
import { User } from "../store/UserSlice";
import { useEffect } from "react";

export default function useAuthCheck(): void {
  const navigate = useNavigate();
  const user: User = useAppSelector(state => state.user);

  useEffect(() => {
    if (!user.username || !user.password || !user.email) {
      navigate("/signup");
    } else {
      navigate("/home");
    }
  }, []);
}