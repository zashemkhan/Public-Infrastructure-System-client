import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReportIssue = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(["Streetlight", "Pothole", "Garbage", "Water Leakage", "Footpath"]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [issueCount, setIssueCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  // Fetch user's current issue count and premium status
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosSecure.get(`/citizen/my-info/${user.email}`);
        setIssueCount(res.data.issueCount || 0);
        setIsPremium(res.data.isPremium || false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserInfo();
  }, [user.email]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPremium && issueCount >= 3) {
      toast.error("Free users can submit maximum 3 issues. Please subscribe to premium.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("location", formData.location);
      if (formData.image) data.append("image", formData.image);
      data.append("email", user.email);

      await axiosSecure.post("/citizen/report-issue", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Issue reported successfully!");
      navigate("/dashboard/my-issues");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Report New Issue</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Image</label>
          <input type="file" name="image" onChange={handleChange} className="border w-full p-2 rounded" />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Report Issue"}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
