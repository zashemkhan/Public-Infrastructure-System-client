import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const AssignedIssues = () => {
  const axiosSecure = useAxiosSecure();

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["staff-assigned-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/staff/assigned-issues");
      return res.data;
    },
  });

  const handleChangeStatus = async (issueId, newStatus) => {
    try {
      await axiosSecure.patch(`/staff/assigned-issues/${issueId}`, { status: newStatus });
      toast.success("Status updated");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Assigned Issues</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id} className="text-center">
              <td className="border p-2">{issue.title}</td>
              <td className="border p-2">{issue.category}</td>
              <td className="border p-2">{issue.status}</td>
              <td className="border p-2">{issue.priority}</td>
              <td className="border p-2 space-x-2">
                <select
                  className="border rounded p-1"
                  value={issue.status}
                  onChange={(e) => handleChangeStatus(issue._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="working">Working</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedIssues;
