import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useRole = () => {
  const { user } = useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data.role;
    },
  });

  return [role, isLoading];
};

export default useRole;
