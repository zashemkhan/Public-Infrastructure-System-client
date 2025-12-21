import React from "react";

const Filters = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4">
      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
        className="p-2 border rounded"
      >
        <option value="all">All Categories</option>
        <option value="pothole">Pothole</option>
        <option value="streetlight">Streetlight</option>
        <option value="garbage">Garbage</option>
        {/* Add more categories */}
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In-Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters({ ...filters, priority: e.target.value })
        }
        className="p-2 border rounded"
      >
        <option value="all">All Priority</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="p-2 border rounded"
      />
    </div>
  );
};

export default Filters;
