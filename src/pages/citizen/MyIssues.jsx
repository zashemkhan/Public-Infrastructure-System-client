import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const MyIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const userEmail = localStorage.getItem("user-email");

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal state
  const [editingIssue, setEditingIssue] = useState(null);

  // Fetch issues with React Query & filters
  const { data: issues = [], isLoading } = useQuery(
    ["my-issues", userEmail, statusFilter, categoryFilter],
    async () => {
      const res = await axiosSecure.get("/users/my-issues", {
        params: {
          email: userEmail,
          status: statusFilter,
          category: categoryFilter,
        },
      });
      return res.data;
    }
  );

  const handleDelete = async (issueId, status) => {
    if (status !== "pending")
      return toast.error("Only pending issues can be deleted");
    if (!window.confirm("Delete this issue?")) return;

    try {
      await axiosSecure.delete(`/citizen/my-issues/${issueId}`);
      toast.success("Issue deleted");
      queryClient.invalidateQueries(["my-issues", userEmail]);
    } catch (error) {
      toast.error("Failed to delete issue");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(
        `/citizen/my-issues/${editingIssue._id}`,
        editingIssue
      );
      toast.success("Issue updated successfully");
      setEditingIssue(null);
      queryClient.invalidateQueries(["my-issues", userEmail]);
    } catch (error) {
      toast.error("Failed to update issue");
    }
  };

  if (isLoading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-4">My Issues</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
        </select>
      </div>

      {/* Issues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues.map((issue) => (
          <div key={issue._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{issue.title}</h2>
            <p>Status: <span className="font-semibold">{issue.status}</span></p>
            <p>Priority: <span className="font-semibold">{issue.priority}</span></p>
            <p>Category: <span className="font-semibold">{issue.category}</span></p>

            <div className="mt-2 flex gap-2 flex-wrap">
              {issue.status === "pending" && (
                <button
                  onClick={() => setEditingIssue(issue)}
                  className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                >
                  Edit
                </button>
              )}
              {issue.status === "pending" && (
                <button
                  onClick={() => handleDelete(issue._id, issue.status)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => (window.location.href = `/issues/${issue._id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Issue</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                value={editingIssue.title}
                onChange={(e) =>
                  setEditingIssue({ ...editingIssue, title: e.target.value })
                }
                className="w-full border p-2 rounded"
                placeholder="Title"
                required
              />
              <textarea
                value={editingIssue.description}
                onChange={(e) =>
                  setEditingIssue({ ...editingIssue, description: e.target.value })
                }
                className="w-full border p-2 rounded"
                rows="4"
                placeholder="Description"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingIssue(null)}
                  className="px-3 py-1 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIssues;
