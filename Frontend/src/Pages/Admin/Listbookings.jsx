import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";

const Listbookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/admin/bookings",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <h1 className="font-medium text-2xl">
        List <span className="text-red-500">Bookings</span>
      </h1>

      <div className="max-w-6xl mt-10 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          <thead>
            <tr className="bg-gray-400 text-left text-white">
              <th className="p-3">User</th>
              <th className="p-3">Movie</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Seats</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Transaction ID</th>
            </tr>
          </thead>

          <tbody className="text-sm font-light">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No bookings available
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const dateObj = new Date(booking.showDate);
                const date = dateObj.toLocaleDateString();
                const time = booking.showTime;

                return (
                  <tr key={booking._id} className="border-b">
                    <td className="p-3">
                      {booking.user?.name || "Unknown"}
                    </td>
                    <td className="p-3">
                      {booking.movie?.title || "Unknown"}
                    </td>
                    <td className="p-3">{date}</td>
                    <td className="p-3">{time}</td>
                    <td className="p-3">
                      {booking.seats?.join(", ")}
                    </td>
                    <td className="p-3">₹ {booking.totalPrice}</td>
                    <td className="p-3">
                      {booking.transactionId || "N/A"}
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

export default Listbookings;
