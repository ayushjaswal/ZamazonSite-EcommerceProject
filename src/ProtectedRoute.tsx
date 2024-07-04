import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.authUser.email);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login', { state: { from: location } });
    }
  }, [loggedInUser, navigate]);

  return loggedInUser ? children : null;
};

export default ProtectedRoute;
