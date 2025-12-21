// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
// import { toast } from "react-hot-toast";

// const IssueDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const [issue, setIssue] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchIssue = async () => {
//     try {
//       const res = await axiosSecure.get(`/issues/${id}`);
//       setIssue(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load issue");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchIssue();
//   }, [id]);

//   const handleDelete = async () => {
//     if (!confirm("Delete this issue?")) return;
//     try {
//       await axiosSecure.delete(`/citizen/my-issues/${id}`);
//       toast.success("Issue deleted");
//       window.location.href = "/dashboard/my-issues";
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete issue");
//     }
//   };

//   const handleBoost = async () => {
//     try {
//       // Payment integration logic here (e.g., Stripe)
//       const res = await axiosSecure.post(`/issues/boost/${id}`, { email: user.email });
//       toast.success("Issue boosted successfully!");
//       fetchIssue();
//     } catch (err) {
//       console.error(err);
//       toast.error("Boost failed");
//     }
//   };

//   if (loading) return <div className="text-center mt-20">Loading...</div>;
//   if (!issue) return <div className="text-center mt-20">Issue not found</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-green-600 mb-4">{issue.title}</h1>
//       <p className="mb-2"><span className="font-semibold">Category:</span> {issue.category}</p>
//       <p className="mb-2"><span className="font-semibold">Location:</span> {issue.location}</p>
//       <p className="mb-2"><span className="font-semibold">Status:</span> {issue.status}</p>
//       <p className="mb-2"><span className="font-semibold">Priority:</span> {issue.priority}</p>
//       {issue.assignedStaff && (
//         <p className="mb-2"><span className="font-semibold">Assigned Staff:</span> {issue.assignedStaff.name}</p>
//       )}
//       {issue.image && (
//         <img src={issue.image} alt="issue" className="mt-4 rounded shadow" />
//       )}
//       <div className="mt-4 flex gap-4">
//         {user.email === issue.email && issue.status === "pending" && (
//           <>
//             <button
//               onClick={handleDelete}
//               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//             >
//               Delete
//             </button>
//             <button
//               onClick={() => window.location.href = `/dashboard/edit-issue/${id}`}
//               className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//             >
//               Edit
//             </button>
//           </>
//         )}
//         {user.email === issue.email && issue.priority !== "high" && (
//           <button
//             onClick={handleBoost}
//             className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//           >
//             Boost Priority
//           </button>
//         )}
//       </div>

//       {/* Timeline Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Issue Timeline</h2>
//         <div className="border-l-2 border-green-600 pl-4 space-y-4">
//           {issue.timeline?.map((entry, index) => (
//             <div key={index} className="relative">
//               <span className="absolute -left-3 top-1 w-6 h-6 bg-green-600 rounded-full"></span>
//               <p><span className="font-semibold">{entry.status}</span> - {entry.message}</p>
//               <p className="text-sm text-gray-500">{entry.updatedBy} | {new Date(entry.date).toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueDetails;
