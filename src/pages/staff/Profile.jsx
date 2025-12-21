import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthProvider";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get(`/users/profile/${user.email}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/users/profile/${user.email}`, profile);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Profile</h1>

      <form
        className="bg-white p-6 rounded shadow space-y-4"
        onSubmit={handleUpdate}
      >
        <div>
          <label className="font-semibold">Name</label>
          <input
            value={profile.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="border w-full p-2 rounded"
          />
        </div>
        <div>
          <label className="font-semibold">Photo URL</label>
          <input
            value={profile.photoURL || ""}
            onChange={(e) =>
              setProfile({ ...profile, photoURL: e.target.value })
            }
            className="border w-full p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
