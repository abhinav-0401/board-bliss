import { Provider } from "react-redux";
import store from "../store/Store";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

export default function AppProvider(): JSX.Element {
  return (
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  );
}