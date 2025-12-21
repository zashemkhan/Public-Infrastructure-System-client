import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const AllIssues = () => {
  const axiosSecure = useAxiosSecure();

  const { data: issues = [], refetch } = useQuery({
    queryKey: ["all-issues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-issues");
      return res.data;
    },
  });

  const handleAssignStaff = async (issueId, staffId) => {
    try {
      await axiosSecure.post(`/admin/assign-staff/${issueId}`, { staffId });
      toast.success("Staff assigned successfully");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign staff");
    }
  };

  const handleReject = async (issueId) => {
    if (!confirm("Reject this issue?")) return;
    try {
      await axiosSecure.patch(`/admin/reject-issue/${issueId}`);
      toast.success("Issue rejected");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject issue");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">All Issues</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Priority</th>
            <th className="border p-2">Assigned Staff</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue._id} className="text-center">
              <td className="border p-2">{issue.title}</td>
              <td className="border p-2">{issue.category}</td>
              <td className="border p-2">{issue.status}</td>
              <td className="border p-2">{issue.priority}</td>
              <td className="border p-2">
                {issue.assignedStaff ? issue.assignedStaff.name : (
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                    onClick={() => {
                      const staffId = prompt("Enter Staff ID to assign:");
                      if (staffId) handleAssignStaff(issue._id, staffId);
                    }}
                  >
                    Assign Staff
                  </button>
                )}
              </td>
              <td className="border p-2">
                {issue.status === "pending" && (
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleReject(issue._id)}
                  >
                    Reject
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllIssues;
