import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { BackendUrl } from "../config";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
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
        setUser(data.user || data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
