import React, { useEffect, useState } from "react";
import { Calendar, CheckIcon, DeleteIcon } from "lucide-react";
import toast from "react-hot-toast";
const Addshows = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovies] = useState(null);
  const [dateTimeSelection, setTimeSelection] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [showPrice, setShowPrice] = useState("");
  const fixedShowTimes = ["10:00", "13:00", "16:00", "19:00"];

  const fetchNowPlayingMovies = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/movies", {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setNowPlayingMovies(data);
      } else {
        setNowPlayingMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setNowPlayingMovies([]);
    }
  };

  const handleAddTime = (time) => {
    if (!selectedDate) {
      return toast.error("Please select a date first");
    }

    setTimeSelection((prev) => {
      const times = prev[selectedDate] || [];

      if (!times.includes(time)) {
        return { ...prev, [selectedDate]: [...times, time] };
      }

      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);

      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);
  const handleAddShow = async () => {
    if (!selectedMovie || !showPrice) {
      return toast.error("Please select a movie and enter price");
    }

    const entries = Object.entries(dateTimeSelection);

    if (entries.length === 0) {
      return toast.error("Please add at least one date and time");
    }

    try {
      for (const [date, times] of entries) {
        for (const time of times) {
          const dateTime = new Date(`${date}T${time}`);

          const res = await fetch("http://localhost:3000/api/shows", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              movie: selectedMovie,
              showDateTime: dateTime,
              showPrice: Number(showPrice),
            }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to create show");
          }
        }
      }

      toast.success("Shows added successfully!");

      setTimeSelection({});
      setShowPrice("");
      setSelectedMovies(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <h1 className="font-medium text-2xl">
        Add <span className="text-red-500"> Shows</span>
      </h1>

      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      <div className="overflow-x-auto pb-4">
        <div className="group flex flex-wrap gap-4 mt-4 w-max">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie._id}
              onClick={() => setSelectedMovies(movie._id)}
              className="relative max-w-40 cursor-pointer 
               hover:-translate-y-1 
              transition duration-300"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={movie.poster_path}
                  className="w-full object-cover brightness-90"
                  alt=""
                />

                <div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
                  <p className="flex items-center gap-1 text-gray-400">
                    {movie.vote_average.toFixed(1)}
                  </p>

                  <p className="text-gray-300">
                    {movie.vote_count / 1000}k Votes
                  </p>
                </div>
              </div>

              {selectedMovie === movie._id && (
                <div className="absolute top-2 right-2 flex items-center justify-center bg-red-950/80 h-6 w-6 rounded">
                  <CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
              )}

              <p className="font-medium">{movie.title}</p>
              <p className="text-gray-400 text-sm">{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Show Price</label>

        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
          <p className="text-gray-400 text-sm">$</p>

          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="outline-none bg-transparent"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Select Date</label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="outline-none bg-gray-400 cursor-pointer px-3 py-2 rounded"
        />
      </div>
      {selectedDate && (
        <div className="flex gap-3 mt-4">
          {fixedShowTimes.map((time) => (
            <button
              key={time}
              onClick={() => handleAddTime(time)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-red-500 transition"
            >
              {time}
            </button>
          ))}
        </div>
      )}
      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-6 ">
          <h2 className="mb-2">Selected Date-Time</h2>
          <ul className="space-y-3">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li key={date}>
                <div className="font-medium">{date}</div>
                <div className="flex flex-wrap gap-2 mt-1 text-sm ">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border px-2 py-1 flex items-center rounded"
                    >
                      <span>{time}</span>
                      <DeleteIcon
                        onClick={() => handleRemoveTime(date, time)}
                        width={15}
                        className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleAddShow}
        className="bg-red-500 text-white px-8 py-2 mt-6 rounded hover:bg-red-400 transistion-all cursor-pointer"
      >
        Add Show
      </button>
    </>
  );
};

export default Addshows;
