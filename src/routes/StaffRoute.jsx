import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const StaffRoute = ({ children }) => {
  const [role, loading] = useRole();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (role !== "staff") {
    return <Navigate to="/" />;
  }

  return children;
};

export default StaffRoute;
