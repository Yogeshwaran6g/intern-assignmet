import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ?
                           <Outlet/> :
                           <Navigate to="/login"/>;

};

export default ProtectedRouter;
