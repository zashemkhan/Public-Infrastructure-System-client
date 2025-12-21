import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useUserRole = () => {
  const { user } = useContext(AuthContext);

  return useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });
};

export default useUserRole;
