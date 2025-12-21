import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: issue = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issues/${id}`);
      return res.data;
    },
  });

  const handleBoost = async () => {
    try {
      await axiosSecure.patch(`/issues/boost/${id}`);
      toast.success("Issue boosted successfully");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Boost failed");
    }
  };

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load issue
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {issue.image && (
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-96 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-2">{issue.title}</h1>

      <div className="flex gap-3 mb-4 flex-wrap">
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded">
          {issue.category}
        </span>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded">
          {issue.priority}
        </span>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
          {issue.status}
        </span>
      </div>

      <p className="text-gray-600 mb-2">📍 {issue.location}</p>

      <p className="text-gray-700 leading-relaxed mb-4">
        {issue.description}
      </p>

      <div className="font-semibold mb-4">
        👍 Upvotes: {issue.upvotes}
      </div>

      {!issue.isBoosted && (
        <button
          onClick={handleBoost}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Boost Priority (100tk)
        </button>
      )}

      {/* Timeline Section */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Issue Timeline
      </h2>

      <div className="border-l-2 border-green-600 pl-4 space-y-4">
        {issue.timeline?.map((item, index) => (
          <div key={index}>
            <p className="font-semibold">{item.status}</p>
            <p className="text-sm">{item.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(item.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssueDetails;
