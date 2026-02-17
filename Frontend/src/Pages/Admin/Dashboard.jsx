import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/admin/stats",
          {
            method: "GET",
            credentials: "include", 
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch admin stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError("Access denied or error loading data");
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!stats) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-6">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">
            ₹{stats.totalRevenue}
          </h2>
        </div>

        <div className="bg-white shadow rounded p-6">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-bold  text-green-600">
            {stats.totalBookings}
          </h2>
        </div>

        <div className="bg-white shadow rounded p-6">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold  text-green-600">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white shadow rounded p-6">
          <p className="text-gray-500">Total Movies</p>
          <h2 className="text-2xl font-bold  text-green-600">
            {stats.totalMovies}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
