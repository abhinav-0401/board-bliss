import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />
      }
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;