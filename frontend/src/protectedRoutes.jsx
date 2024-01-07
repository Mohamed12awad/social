import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  let userState = isAuthenticated();

  // console.log(userState);

  if (!userState) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
