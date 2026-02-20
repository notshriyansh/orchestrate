import { Routes, Route } from "react-router-dom";
import LandingPage from "./modules/landing/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashboardPage from "./modules/dashboard/DashBoardPage";
import Editor from "./pages/Editor";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editor/:id"
        element={
          <ProtectedRoute>
            <Editor />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
