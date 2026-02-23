import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Editor from "../pages/Editor";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/editor/:id",
    element: <Editor />,
  },
]);
