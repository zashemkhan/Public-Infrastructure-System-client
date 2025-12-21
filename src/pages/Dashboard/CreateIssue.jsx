import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CreateIssue = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const issueData = {
      title: form.title.value,
      category: form.category.value,
      priority: form.priority.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
    };

    try {
      const token = localStorage.getItem("access-token");

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/issues`,
        issueData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Issue reported successfully!");
      form.reset();
    } catch (error) {
      toast.error("Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Report a Public Issue
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          placeholder="Issue Title"
          className="w-full border p-3 rounded"
          required
        />

        <select name="category" className="w-full border p-3 rounded" required>
          <option value="">Select Category</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
        </select>

        <select name="priority" className="w-full border p-3 rounded" required>
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded"
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Describe the issue..."
          rows="5"
          className="w-full border p-3 rounded"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
        >
          {loading ? "Submitting..." : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default CreateIssue;
