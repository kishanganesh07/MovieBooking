import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../Components/Loading";
import { ArrowRight, ClockIcon } from "lucide-react";
import isoTimeFormat from "../Libary/isoTimeFormat";
import toast from "react-hot-toast";
const SeatLayoutPage = () => {
  const groupRows = [
    ["A", "B"],
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"],
  ];
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData,
      });
    }
  };
  const handleSeatClick = (seatId) => {
    if (!selectedTime) {
      return toast("Please select a time slot first");
    }
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
      <div key={row} className="flex gap-2 mt-2 ">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            const seatId = `${row}${i + 1}`;
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`h-8 w-8 rounded border border-white cursor-pointer  transition-colors ${selectedSeats.includes(seatId) ? "bg-red-600 text-white" : "text-gray-300"}`}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      </div>
      
    );
  };
  useEffect(() => {
    getShow();
  }, []);
  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 ">
      <div className="w-60 bg-red-600 border border-red-300 rounded-lg py-10 h-max md:sticky md:top-30 ">
        <p className="text-lg font-semibold px-6 ">Available Timings</p>
        <div className="mt-5 space-y-1 ">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transistion ${selectedTime?.time === item.time ? "bg-red-500 text-white" : "hover:bg-red-600"} `}
            >
              <ClockIcon className="h-4 w-4 " />
              <p className="text-sm ">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>
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
      <button onClick={()=> navigate("/my-bookings")} className="flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-red-700 hover:bg-red-600 transition rounded-full font-medium cursor-pointer active-scale-95  ">Proceed to Checkout <ArrowRight strokeWidth={3}/></button>

      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SeatLayoutPage;
