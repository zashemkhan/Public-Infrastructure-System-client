import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const handleBlockUnblock = async (userId, block) => {
    try {
      await axiosSecure.patch(`/admin/users/${userId}`, { block });
      toast.success(block ? "User blocked" : "User unblocked");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Manage Users</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Premium</th>
            <th className="border p-2">Blocked</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.premium ? "Yes" : "No"}</td>
              <td className="border p-2">{user.blocked ? "Yes" : "No"}</td>
              <td className="border p-2">
                <button
                  className={`px-2 py-1 rounded ${user.blocked ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
                  onClick={() => handleBlockUnblock(user._id, !user.blocked)}
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
