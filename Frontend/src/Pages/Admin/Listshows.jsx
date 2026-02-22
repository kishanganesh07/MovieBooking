import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import { BackendUrl } from "../../config";

const Listshows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const res = await fetch(`${BackendUrl}/api/shows`);

      if (!res.ok) {
        throw new Error("Failed to fetch shows");
      }

      const data = await res.json();
      setShows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load shows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BackendUrl}/api/shows/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Delete failed");
      }

      toast.success("Show deleted successfully");
      getAllShows(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="font-medium text-2xl">
        Shows <span className="text-red-500">List</span>
      </h1>

      <div className="max-w-5xl mt-10 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-gray-400 text-left text-white">
              <th className="p-3">Movie Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm font-light">
            {shows.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No shows available
                </td>
              </tr>
            ) : (
              shows.map((show) => {
                const dateObj = new Date(show.showDateTime);

                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr key={show._id} className="border-b">
                    <td className="p-3">
                      {show.movie?.title || "Unknown"}
                    </td>
                    <td className="p-3">{date}</td>
                    <td className="p-3">{time}</td>
                    <td className="p-3">₹ {show.showPrice}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(show._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Listshows;
