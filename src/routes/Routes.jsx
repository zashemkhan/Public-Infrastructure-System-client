import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import IssueDetails from "../pages/issues/IssueDetails";
import MyIssues from "../pages/Dashboard/MyIssues";
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";
import AssignedIssues from "../pages/staff/AssignedIssues";
import ManageUsers from "../pages/admin/ManageUsers";
import AllIssues from "../pages/admin/AllIssues";
import AddIssue from "../pages/AllIssues/AddIssue";
import DashboardHome from "../pages/Dashboard/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      // ✅ Issue Details (public OR private)
      {
        path: "issue/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
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
      { index: true, element: <DashboardHome /> },

      // Citizen
      { path: "my-issues", element: <MyIssues /> },
      { path: "add-issue", element: <AddIssue /> },

      // Staff
      {
        path: "assigned",
        element: (
          <StaffRoute>
            <AssignedIssues />
          </StaffRoute>
        ),
      },

      // Admin
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-issues",
        element: (
          <AdminRoute>
            <AllIssues />
          </AdminRoute>
        ),
      },
    ],
  },
]);
