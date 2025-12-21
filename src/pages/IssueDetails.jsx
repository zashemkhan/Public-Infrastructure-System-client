import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const IssueDetails = () => {
  const { id } = useParams();

  const { data: issue, isLoading, isError } = useQuery({
    queryKey: ["issue-details", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/issues/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load issue
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <img
        src={issue.image}
        alt={issue.title}
        className="w-full h-96 object-cover rounded mb-6"
      />

      <h1 className="text-4xl font-bold mb-2">{issue.title}</h1>

      <div className="flex gap-3 mb-4">
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

      <p className="text-gray-600 mb-4">
        📍 Location: {issue.location}
      </p>

      <p className="text-gray-700 leading-relaxed">
        {issue.description}
      </p>

      <div className="mt-6 font-semibold">
        👍 Upvotes: {issue.upvotes}
      </div>
    </div>
  );
};

export default IssueDetails;
