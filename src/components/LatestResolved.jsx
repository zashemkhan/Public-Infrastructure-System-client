import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import IssueCard from "./IssueCard";

const LatestResolved = () => {
  const {
    data: issues = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-resolved"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/issues?status=resolved`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 text-green-700 font-semibold">
        Loading latest resolved issues...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load resolved issues
      </div>
    );
  }

  return (
    <section className="py-16 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        Latest Resolved Issues
      </h2>

      {issues.length === 0 ? (
        <p className="text-center text-gray-500">No resolved issues found</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} refetch={refetch} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LatestResolved;
