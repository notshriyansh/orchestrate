import { createBrowserRouter } from "react-router-dom";
import AuthTest from "../pages/AuthTest";
import Dashboard from "../pages/Dashboard";
import Editor from "../pages/Editor";

export const router = createBrowserRouter([
  {
    path: "/auth-test",
    element: <AuthTest />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/editor/:id",
    element: <Editor />,
  },
]);
