// src/PrivateRoute.jsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/userinfo", { credentials: "include" })
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <div>Loading...</div>;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
