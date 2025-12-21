import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // User info from localStorage
  const role = localStorage.getItem("role"); // admin / staff / citizen
  const email = localStorage.getItem("user-email"); // current logged-in email

  const {
    data: issue = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  // Boost Priority (Admin Only)
  const handleBoost = async () => {
    try {
      await axiosSecure.patch(`/issues/boost/${id}`);
      toast.success("Issue boosted successfully 🚀");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Boost failed");
    }
  };

  // Upvote (Citizen / Staff)
  const handleUpvote = async () => {
    try {
      await axiosSecure.patch(`/issues/upvote/${id}`);
      toast.success("Upvoted successfully 👍");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upvote failed");
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  if (isError)
    return (
      <div className="text-center py-20 text-red-500">Failed to load issue</div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Issue Image */}
      {issue.image && (
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-96 object-cover rounded mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-3">{issue.title}</h1>

      {/* Badges */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
          {issue.category}
        </span>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded">
          Priority: {issue.priority}
        </span>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
          Status: {issue.status}
        </span>
        {issue.isBoosted && (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded">
            🔥 Boosted
          </span>
        )}
      </div>

      {/* Location */}
      <p className="text-gray-600 mb-2">📍 Location: {issue.location}</p>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-6">{issue.description}</p>

      {/* Upvotes */}
      <div className="font-semibold mb-4">👍 Upvotes: {issue.upvotes}</div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        {/* Boost Button (Admin only) */}
        {role === "admin" && !issue.isBoosted && (
          <button
            onClick={handleBoost}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
          >
            🚀 Boost Priority (100৳)
          </button>
        )}

        {/* Upvote Button (Citizen / Staff, not own issue) */}
        {role !== "admin" && issue.reporter !== email && (
          <button
            onClick={handleUpvote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            👍 Upvote
          </button>
        )}
      </div>

      {/* Status Update (Admin/Staff) */}
      {(role === "admin" || role === "staff") && (
        <div className="mt-6">
          <label className="font-semibold mr-2">Change Status:</label>
          <select
            value={issue.status}
            onChange={async (e) => {
              const newStatus = e.target.value;
              try {
                await axiosSecure.patch(`/issues/status/${id}`, { status: newStatus });
                toast.success("Status updated");
                refetch();
              } catch (err) {
                toast.error(err.response?.data?.message || "Status update failed");
              }
            }}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      )}

      {/* Timeline */}
      <h2 className="text-2xl font-semibold mt-12 mb-4">Issue Timeline</h2>

      {issue.timeline?.length > 0 ? (
        <div className="border-l-2 border-green-600 pl-4 space-y-4">
          {issue.timeline.map((item, index) => (
            <div key={index}>
              <p className="font-semibold capitalize">{item.status}</p>
              <p className="text-sm">{item.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(item.updatedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No timeline updates yet.</p>
      )}
    </div>
  );
};

export default IssueDetails;
