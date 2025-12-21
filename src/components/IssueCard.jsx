import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const IssueCard = ({ issue, refetch }) => {
  const navigate = useNavigate();

  const handleUpvote = async () => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      toast.error("Please login to upvote");
      navigate("/login");
      return;
    }

    try {
      await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/issues/upvote/${issue._id}`,
        {},
        { headers: { authorization: `Bearer ${token}` } }
      );
      refetch();
      toast.success("Upvoted successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upvote failed!");
    }
  };

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition bg-white">
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h2 className="text-xl font-semibold text-green-800">{issue.title}</h2>
      <p className="text-sm text-green-700">{issue.category}</p>
      <div className="flex justify-between items-center mt-2">
        <span
          className={`px-2 py-1 rounded text-white ${
            issue.priority === "high" ? "bg-red-400" : "bg-green-400"
          }`}
        >
          {issue.priority}
        </span>
        <span
          className={`px-2 py-1 rounded ${
            issue.status === "pending"
              ? "bg-yellow-200 text-black"
              : issue.status === "in-progress"
              ? "bg-blue-200 text-black"
              : issue.status === "resolved"
              ? "bg-green-200 text-black"
              : "bg-gray-200 text-black"
          }`}
        >
          {issue.status}
        </span>
      </div>
      <p className="mt-2 text-green-700">{issue.location}</p>
      <div className="flex justify-between mt-4 items-center">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleUpvote}
        >
          Upvote ({issue.upvotes})
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => navigate(`/issue/${issue._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
