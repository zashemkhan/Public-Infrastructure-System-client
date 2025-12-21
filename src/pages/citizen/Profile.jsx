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

  const handleSubscribe = async () => {
    try {
      // TODO: Payment integration
      await axiosSecure.post(`/users/subscribe/${user.email}`);
      toast.success("Subscribed successfully!");
      setProfile({ ...profile, isPremium: true });
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-green-600 mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {profile.name || user.displayName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span>{" "}
          {profile.role || "Citizen"}
        </p>
        <p>
          <span className="font-semibold">Premium:</span>{" "}
          {profile.isPremium ? "✅ Premium User" : "❌ Free User"}
        </p>

        {!profile.isPremium && (
          <button
            onClick={handleSubscribe}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Subscribe for 1000tk
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
