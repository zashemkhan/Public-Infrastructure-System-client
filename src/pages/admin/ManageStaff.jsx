import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();

  const { data: staff = [], refetch } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/staff");
      return res.data;
    },
  });

  const handleDelete = async (staffId) => {
    if (!confirm("Delete this staff?")) return;
    try {
      await axiosSecure.delete(`/admin/staff/${staffId}`);
      toast.success("Staff deleted");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Manage Staff</h1>
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded mb-4"
        onClick={() => window.location.href = "/admin/add-staff"}
      >
        Add Staff
      </button>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s) => (
            <tr key={s._id} className="text-center">
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.phone}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => window.location.href = `/admin/edit-staff/${s._id}`}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(s._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStaff;
