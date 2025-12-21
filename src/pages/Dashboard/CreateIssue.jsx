import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const CreateIssue = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  // Get user info from localStorage
  const userEmail = localStorage.getItem("user-email");
  const isPremium = localStorage.getItem("user-isPremium") === "true";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Free user limit check
      if (!isPremium) {
        const res = await axiosSecure.get(`/users/my-issues/count?email=${userEmail}`);
        if (res.data.count >= 3) {
          toast.error("Free users can submit only 3 issues. Upgrade to premium to submit more.");
          setLoading(false);
          return;
        }
      }

      const form = e.target;
      const issueData = {
        title: form.title.value.trim(),
        category: form.category.value,
        priority: form.priority.value,
        location: form.location.value.trim(),
        description: form.description.value.trim(),
        image: form.image.value.trim() || "",
        reporter: userEmail, // must include reporter
      };

      await axiosSecure.post("/issues", issueData);

      queryClient.invalidateQueries(["my-issues"]); // Refresh user's issue list

      toast.success("Issue reported successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit issue");
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
          placeholder="Image URL (optional)"
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
