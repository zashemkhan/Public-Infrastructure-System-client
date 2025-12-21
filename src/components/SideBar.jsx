import { NavLink } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";

const Sidebar = () => {
  const { data } = useUserRole();
  const role = data?.role;

  return (
    <aside className="w-64 bg-green-700 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <nav className="space-y-3">
        <NavLink to="/dashboard" end>Overview</NavLink>

        {role === "citizen" && (
          <>
            <NavLink to="/dashboard/my-issues">My Issues</NavLink>
            <NavLink to="/dashboard/add-issue">Report Issue</NavLink>
          </>
        )}

        {role === "staff" && (
          <>
            <NavLink to="/dashboard/assigned">Assigned Issues</NavLink>
          </>
        )}

        {role === "admin" && (
          <>
            <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
            <NavLink to="/dashboard/all-issues">All Issues</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
