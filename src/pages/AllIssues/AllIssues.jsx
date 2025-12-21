import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import IssueCard from "../../components/IssueCard";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AllIssues = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    priority: "all",
    search: "",
  });

  // Fetch Issues
  const { data: issues = [], isLoading } = useQuery(
    ["issues", filters],
    async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/issues`,
        { params: filters }
      );
      return res.data;
    }
  );

  // Upvote Mutation
  const upvoteMutation = useMutation(
    async (id) => {
      const token = localStorage.getItem("access-token");
      return await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/issues/upvote/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["issues", filters]);
        toast.success("Upvoted successfully!");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Error occurred");
      },
    }
  );

  const handleUpvote = (issue) => {
    if (!user) {
      toast.error("Login to upvote!");
      return;
    }
    if (issue.createdBy === user.email) {
      toast.error("You cannot upvote your own issue");
      return;
    }
    upvoteMutation.mutate(issue._id);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold mb-4">All Issues</h1>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select name="category" onChange={handleFilterChange} value={filters.category} className="p-2 border rounded">
          <option value="all">All Categories</option>
          <option value="pothole">Pothole</option>
          <option value="streetlight">Streetlight</option>
          <option value="garbage">Garbage</option>
          <option value="water">Water Leakage</option>
        </select>

        <select name="status" onChange={handleFilterChange} value={filters.status} className="p-2 border rounded">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        <select name="priority" onChange={handleFilterChange} value={filters.priority} className="p-2 border rounded">
          <option value="all">All Priority</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          className="p-2 border rounded flex-1"
        />
      </div>

      {/* Issues Grid */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} onUpvote={() => handleUpvote(issue)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllIssues;
