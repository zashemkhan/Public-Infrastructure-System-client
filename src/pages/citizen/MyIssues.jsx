import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useState } from "react";

const MyIssues = () => {
  const axiosSecure = useAxiosSecure();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      const res = await axiosSecure.get("/citizen/my-issues");
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useState(() => { fetchIssues() }, []);

  const handleDelete = async (issueId) => {
    try {
      if (!confirm("Delete this issue?")) return;
      await axiosSecure.delete(`/citizen/my-issues/${issueId}`);
      toast.success("Issue deleted");
      fetchIssues();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">My Issues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {issues.map((issue) => (
          <div key={issue._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{issue.title}</h2>
            <p className="text-sm text-gray-600">{issue.category}</p>
            <p className="mt-1">Status: <span className="font-semibold">{issue.status}</span></p>
            <p className="mt-1">Priority: <span className="font-semibold">{issue.priority}</span></p>
            {issue.status === "pending" && (
              <button
                onClick={() => handleDelete(issue._id)}
                className="bg-red-600 text-white px-2 py-1 rounded mt-2 hover:bg-red-700"
              >
                Delete
              </button>
            )}
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded mt-2 hover:bg-blue-700 ml-2"
              onClick={() => window.location.href = `/issues/${issue._id}`}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyIssues;
