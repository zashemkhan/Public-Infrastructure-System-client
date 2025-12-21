import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState(null);

  // Fetch user role
  useEffect(() => {
    const userEmail = localStorage.getItem("user-email"); // save user email on login
    axiosSecure.get(`/users/role/${userEmail}`).then(res => {
      setRole(res.data.role);
    });
  }, []);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats", role],
    enabled: !!role,
    queryFn: async () => {
      let url = "/dashboard/citizen";
      if (role === "admin") url = "/dashboard/admin";
      else if (role === "staff") url = "/dashboard/staff";

      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        {role?.toUpperCase()} Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Citizen stats */}
        {role === "citizen" && (
          <>
            <StatCard title="Total Issues" value={stats.totalIssues || 0} />
            <StatCard title="Pending" value={stats.pending || 0} />
            <StatCard title="In Progress" value={stats.inProgress || 0} />
            <StatCard title="Resolved" value={stats.resolved || 0} />
            <StatCard title="Total Payments" value={`${stats.totalPayments || 0} TK`} />
          </>
        )}

        {/* Staff stats */}
        {role === "staff" && (
          <>
            <StatCard title="Assigned Issues" value={stats.assignedIssues || 0} />
            <StatCard title="Resolved Issues" value={stats.resolved || 0} />
            <StatCard title="Today's Task" value={stats.todaysTask || 0} />
          </>
        )}

        {/* Admin stats */}
        {role === "admin" && (
          <>
            <StatCard title="Total Issues" value={stats.totalIssues || 0} />
            <StatCard title="Resolved Issues" value={stats.resolved || 0} />
            <StatCard title="Pending Issues" value={stats.pending || 0} />
            <StatCard title="Total Payments" value={`${stats.totalPayments || 0} TK`} />
            <StatCard title="Total Users" value={stats.totalUsers || 0} />
          </>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h2 className="font-semibold">{title}</h2>
    <p className="text-2xl mt-2">{value}</p>
  </div>
);

export default DashboardHome;
