import {Navigate} from "react-router-dom";

import {useLocalStorage } from "./services/auth-service";

import { checkAuth } from "./services/auth-service";

export const ProtectedRoute = ({ children }) => {
    const user = useLocalStorage("user")
    if (user[0] === null) {
      // user is not authenticated
      return <Navigate to="/" />;
    }
    return children;
};

export const AdminRoute = ({children}) => {
  //if not admin and asking for admin page, redirect
  const role = useLocalStorage("userRole")
  if(role[0] !== "Admin") {
    return <Navigate to='/worlds'/>
  }
  return children;
}