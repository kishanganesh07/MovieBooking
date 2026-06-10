import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BackendUrl } from "../config";

const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }
      try {
        const res = await fetch(`${BackendUrl}/api/auth/profile`, {
  credentials: "include"
});


        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) return <div>Checking access...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (!user.isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminRoute;
