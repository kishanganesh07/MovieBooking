import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/profile", {
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
