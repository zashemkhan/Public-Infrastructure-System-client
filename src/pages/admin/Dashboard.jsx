import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Total Issues</h2>
          <p className="text-2xl">{stats.totalIssues || 0}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="font-semibold">Resolved Issues</h2>
          <p className="text-2xl">{stats.resolved || 0}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-semibold">Pending Issues</h2>
          <p className="text-2xl">{stats.pending || 0}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow">
          <h2 className="font-semibold">Total Payments</h2>
          <p className="text-2xl">{stats.totalPayments || 0} TK</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
