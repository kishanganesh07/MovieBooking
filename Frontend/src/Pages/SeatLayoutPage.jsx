import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../Components/Loading";
import { ArrowRight, ClockIcon } from "lucide-react";
import toast from "react-hot-toast";
import FakePayment from "../Components/Payment";

const SeatLayoutPage = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { movieId: id } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/bookings/seats?movieId=${id}&date=${date}&time=${time}`,
          { credentials: "include" },
        );
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        if (!res.ok) {
          console.error("Failed to fetch booked seats");
          return;
        }
        const data = await res.json();
        setBookedSeats(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (id && date && time) fetchBookedSeats();
  }, [id, date, time, navigate]);

  if (!date || !time) {
    return (
      <div className="pt-28 text-center text-gray-400">
        Please select date and time first
      </div>
    );
  }

  const handleSeatClick = (seatId) => {
    if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
      return toast("You can only select 5 Seats ");
    }
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId],
    );
  };
  const renderSeats = (row, count = 9) => {
    return (
      <div key={row} className="flex gap-2 mt-2">
        <div className="flex flex-wrap items-center justify-center gap-2 ">
          {Array.from({ length: count }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            const isBooked = bookedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                disabled={isBooked}
                onClick={() => handleSeatClick(seatId)}
                className={`h-8 w-8 rounded border transition cursor-pointer
                ${
                  isBooked
                    ? "bg-gray-500 cursor-not-allowed text-gray-400"
                    : selectedSeats.includes(seatId)
                      ? "bg-red-600 text-white"
                      : "border-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      </div>
    );
  };
  const handleBookingComplete = async (transactionId) => {
  try {
    const totalPrice = selectedSeats.length * 250;

    const res = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        movie: id,
        showDate: date,
        showTime: time,
        seats: selectedSeats,
        totalPrice,
        transactionId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message || "Booking failed");
    }
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);

    toast.success("Payment Successful 🎉");

    navigate("/my-bookings", {
      state: {
        movieId: id,
        showDate: date,
        showTime: time,
        seats: selectedSeats,
        totalPrice,
        transactionId,
      },
    });

  } catch (error) {
    toast.error(error.message);
  }
};


  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      return toast.error("Please select seats");
    }

    try {
      const res = await fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          movie: id,
          showDate: date,
          showTime: time,
          seats: selectedSeats,
          totalPrice: selectedSeats.length * 250,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message || "Booking failed");
      }
      console.log({
        movie: id,
        showDate: date,
        showTime: time,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * 250,
      });
      console.log("Selected seats:", selectedSeats);

      toast.success("Booking successful!");
      navigate("/my-bookings");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 ">
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16 ">
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <img src={assets.screenImage} alt="Screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="flex flex-col gap-4 mb-6">
            {groupRows.map((group, index) => (
              <div key={index} className="flex gap-4 md:gap-8 justify-center">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
       <button
  disabled={selectedSeats.length === 0}
  onClick={() => setShowPayment(true)}
  className={`flex items-center gap-2 mt-16 px-10 py-3 rounded-full font-medium transition
    ${selectedSeats.length === 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-red-700 hover:bg-red-600 cursor-pointer"
    }`}
>
  Proceed to Checkout <ArrowRight strokeWidth={3} />
</button>

      </div>
       {showPayment && (
        <FakePayment
          amount={selectedSeats.length * 250}
          onClose={() => setShowPayment(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
    
  );
};

export default SeatLayoutPage;
