import { useAuth } from "hooks/_components.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
