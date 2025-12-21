import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddIssue = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("low");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !location) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("access-token");
      const issueData = {
        title,
        description,
        category,
        priority,
        location,
        image,
        createdBy: user.email,
        status: "pending",
        upvotes: 0,
        upvotedUsers: [],
      };

      await axios.post(`${import.meta.env.VITE_SERVER_URL}/issues`, issueData, {
        headers: { authorization: `Bearer ${token}` },
      });

      toast.success("Issue added successfully!");
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Add New Issue</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Title *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description *</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Priority</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Submitting..." : "Add Issue"}
        </button>
      </form>
    </div>
  );
};

export default AddIssue;
