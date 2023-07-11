import { checkAuth } from "../services/auth-service";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const authenticated = checkAuth()
    if (!authenticated) {
      // user is not authenticated
      return <Navigate to="/login" />;
    }
    return children;
};