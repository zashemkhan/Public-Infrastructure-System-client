import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyIssues = () => {
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["my-issues"],
    queryFn: async () => {
      const token = localStorage.getItem("access-token");
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/issues/my`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        My Reported Issues
      </h1>

      {issues.length === 0 ? (
        <p className="text-gray-500">You haven't reported any issue yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-1">{issue.title}</h2>

              <p className="text-sm text-gray-500">{issue.category}</p>

              <div className="flex gap-2 my-2">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                  {issue.status}
                </span>
                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                  {issue.priority}
                </span>
              </div>

              <p className="text-sm text-gray-600">📍 {issue.location}</p>

              <div className="mt-3 font-semibold text-sm">
                👍 Upvotes: {issue.upvotes}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIssues;
