import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BackendUrl } from "../config";
import { assets } from "../assets/assets";
import Loading from "../Components/Loading";
import { ArrowRight, ClockIcon,ArrowLeft } from "lucide-react";
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
  const [movieTitle, setMovieTitle] = useState(""); 



  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await fetch(
          `${BackendUrl}/api/bookings/seats?movieId=${id}&date=${date}&time=${time}`,
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
         const movieRes = await fetch(`${BackendUrl}/api/movies/${id}`, {
          credentials: "include",
        });
        const movieData = await movieRes.json();
        setMovieTitle(movieData.title);

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
          <span className="w-4 text-gray-500 text-xs flex items-center">{row}</span>
          {Array.from({ length: count }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            const isBooked = bookedSeats.includes(seatId);
            const isSelected = selectedSeats.includes(seatId);


            return (
              <button
                key={seatId}
                disabled={isBooked}
                onClick={() => handleSeatClick(seatId)}
                className={`relative group flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-t-lg rounded-b-md transition-all duration-300 cursor-pointer
                ${
                  isBooked
                    ? "bg-gray-800/50 cursor-not-allowed border border-gray-700"
                    :isSelected
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(248,69,101,0.6)] border border-primary transform scale-110 z-10"
                      : "bg-white/5 border border-white/10 hover:bg-white/20 hover:border-primary/50 relative overflow-hidden"
                }`}
              >
               {!isBooked && !isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                )}
                <span className={`text-[10px] select-none ${isBooked ? "text-gray-600" : isSelected ? "text-white" : "text-gray-400"}`}>
                    {i + 1}
                </span>
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

    const res = await fetch(`${BackendUrl}/api/bookings`, {
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
  return (
    <div className="">
     
    <div >
      
      <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 ">
         <button onClick={() => {navigate(-1),scrollTo(0, 0)}}
            className=" flex gap-2 text-gray-400 hover:text-white cursor-pointer transition-colors lg:pl-30 ">
              <ArrowLeft className="w-5 h-5" /> Back

      </button>
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16 ">
        <h1 className="text-2xl font-semibold mb-4">Select Your Seat</h1>
        <img src={assets.screenImage} alt="Screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>
        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          <div className="flex flex-col gap-4 mb-6">
            {groupRows.map((group, index) => (
              <div key={index} className="flex gap-4 md:gap-8 justify-center mb-4">
               {group.map((row) => (
                                <div key={row} className="flex flex-col ">
                                    {renderSeats(row)}
                                </div>
                            ))}
              </div>
            ))}
          </div>
        </div>
         <div className="flex gap-6 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-800 border border-gray-700"></div>
                    <span>Booked</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/5 border border-white/10"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary border border-primary shadow-[0_0_10px_rgba(248,69,101,0.5)]"></div>
                    <span>Selected</span>
                </div>
            </div>
     

      </div>
       <div className="lg:w-80 mt-25 w-full">
            <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl  top-28">
                <h3 className="text-xl font-bold mb-4 text-white">Booking Summary</h3>
                <div className="space-y-4 mb-6">
                    <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wide">Movie</p>
                        <p className="text-white font-medium truncate">{movieTitle || "Loading..."}</p>
                    </div>
                    <div className="flex justify-between">
                        <div>
                             <p className="text-gray-400 text-xs uppercase tracking-wide">Date</p>
                             <p className="text-white font-medium">{new Date(date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-gray-400 text-xs uppercase tracking-wide">Time</p>
                             <p className="text-white font-medium">{time}</p>
                        </div>
                    </div>
                    <div>
                         <p className="text-gray-400 text-xs uppercase tracking-wide">Selected Seats</p>
                         <div className="flex flex-wrap gap-2 mt-1">
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map(seat => (
                                    <span key={seat} className="px-2 py-1 bg-white/10 rounded text-xs text-white">{seat}</span>
                                ))
                            ) : (
                                <span className="text-gray-600 italic text-sm">None selected</span>
                            )}
                         </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 mb-6">
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Price</span>
                        <span className="text-primary">₹ {selectedSeats.length * 250}</span>
                    </div>
                     <p className="text-xs text-gray-500 mt-1">₹ 250 per ticket</p>
                </div>

                <button
                disabled={selectedSeats.length === 0}
                onClick={() => setShowPayment(true)}
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer
                    ${selectedSeats.length === 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                >
                Proceed to Pay <ArrowRight className="w-4 h-4" strokeWidth={3} />
                </button>
            </div>
         </div>
       {showPayment && (
        <FakePayment
          amount={selectedSeats.length * 250}
          onClose={() => setShowPayment(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
    </div>
    </div>
    
  );
};

export default SeatLayoutPage;
