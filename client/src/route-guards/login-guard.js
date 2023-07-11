import { checkAuth } from "../services/auth-service";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const user = checkAuth()
    if (!user) {
      // user is not authenticated
      return <Navigate to="/login" />;
    }
    return children;
};