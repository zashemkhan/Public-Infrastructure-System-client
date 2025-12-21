import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg p-5">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Dashboard</h2>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard"
          className="block p-2 rounded hover:bg-green-100"
        >
          Citizen Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/admin"
          className="block p-2 rounded hover:bg-green-100"
        >
          Admin Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/staff"
          className="block p-2 rounded hover:bg-green-100"
        >
          Staff Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/create-issue"
          className="block p-2 rounded hover:bg-green-100"
        >
          Report Issue
        </NavLink>
      </nav>

      <NavLink
        to="/dashboard/my-issues"
        className="block p-2 rounded hover:bg-green-100"
      >
        My Issues
      </NavLink>
    </aside>
  );
};

export default Sidebar;
