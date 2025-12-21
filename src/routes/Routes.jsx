import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
// import Login from "../pages/Login/Login";
// import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
// import DashboardLayout from "../layouts/DashboardLayout";
// import MainLayout from "../layouts/MainLayout";
// import CitizenDashboard from "../pages/Dashboard/CitizenDashboard";
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import StaffDashboard from "../pages/Dashboard/StaffDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import IssueDetails from "../pages/IssueDetails";
import CitizenDashboard from "../pages/Dashboard/CitizenDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import StaffDashboard from "../pages/Dashboard/StaffDashboard";
import CreateIssue from "../pages/Dashboard/CreateIssue";
import MyIssues from "../pages/Dashboard/MyIssues";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/issue/:id", element: <IssueDetails /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <CitizenDashboard /> },
      { path: "create-issue", element: <CreateIssue /> },
      { path: "my-issues", element: <MyIssues /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "staff", element: <StaffDashboard /> },
    ],
  },
]);
