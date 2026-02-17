import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SelectShow = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const dates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const times = ["10:30", "14:00", "18:30", "22:00"];

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-40">
      <h1 className="text-2xl font-semibold mb-6">
        Select Date & Time
      </h1>
      <div className="flex gap-3 overflow-x-auto">
        {dates.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`px-4 py-2 rounded-md border cursor-pointer ${
              selectedDate === date
                ? "bg-red-600 text-white cursor-pointer"
                : "hover:bg-gray-800 cursor-pointer"
            }`}
          >
            {new Date(date).toDateString().slice(0, 10)}
          </button>
        ))}
      </div>
      {selectedDate && (
  <div className="mt-6 flex gap-4 flex-wrap ">
    {times
      .filter((time) => {
        const now = new Date();
        const showTime = new Date(
          selectedDate + "T" + time + ":00"
        );
        return showTime > now;
      })
      .map((time) => (
        <button
          key={time}
          onClick={() =>
            navigate(
              `/seats/${movieId}?date=${selectedDate}&time=${time}`
            )
          }
          className="px-4 py-2 border rounded-md hover:bg-red-600  cursor-pointer"
        >
          {time}
        </button>
      ))}
  </div>
)}

    </div>
  );
};

export default SelectShow;
