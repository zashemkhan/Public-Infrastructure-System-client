import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myIssues, setMyIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyIssues = async () => {
      try {
        const token = localStorage.getItem("access-token");
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/issues?createdBy=${user?.email}`,
          { headers: { authorization: `Bearer ${token}` } }
        );
        setMyIssues(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your issues");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchMyIssues();
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.email}</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/dashboard/add-issue")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Issue
        </button>
        <button
          onClick={() => navigate("/dashboard/my-issues")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          My Issues
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">My Recent Issues</h2>
        {loading ? (
          <p>Loading...</p>
        ) : myIssues.length === 0 ? (
          <p>No issues found. Add one now!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myIssues.slice(0, 6).map((issue) => (
              <div
                key={issue._id}
                className="border p-4 rounded shadow hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold">{issue.title}</h3>
                <p className="text-gray-600">{issue.category}</p>
                <p className="text-gray-600">{issue.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
