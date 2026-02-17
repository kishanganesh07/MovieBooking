import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/users",
        { credentials: "include" }
      );

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="font-medium text-2xl">
        App <span className="text-red-500">Users</span>
      </h1>

      <div className="max-w-6xl mt-10 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden">
          <thead>
            <tr className="bg-gray-400 text-left text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Bookings</th>
              <th className="p-3">Role</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>

          <tbody className="text-sm font-light">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.bookingCount}</td>
                  <td className="p-3">
                    {user.isAdmin ? (
                      <span className="text-green-600 font-medium">
                        Admin
                      </span>
                    ) : (
                      <span>User</span>
                    )}
                  </td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUsers;
