import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { BackendUrl } from "../config";

const SelectShow = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  
  useEffect(() => {
    const fetchShows = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/shows`);
        const data = await res.json();
        const now = new Date();
        // Filter shows for this movie and only upcoming shows
        const movieShows = data.filter(show => 
          show.movie?._id === movieId && 
          new Date(show.showDateTime) >= now
        );
        setShows(movieShows);
        
        // Auto-select first available date if any
        if (movieShows.length > 0) {
            const firstDate = new Date(movieShows[0].showDateTime).toISOString().split("T")[0];
            setSelectedDate(firstDate);
        }
      } catch (err) {
        console.error("Error fetching shows:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, [movieId]);

  // Extract unique dates from shows
  const availableDates = [...new Set(shows.map(show => 
    new Date(show.showDateTime).toISOString().split("T")[0]
  ))].sort();

  // Get times for selected date
  const availableTimes = shows
    .filter(show => new Date(show.showDateTime).toISOString().split("T")[0] === selectedDate)
    .map(show => ({
        id: show._id,
        time: new Date(show.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
        price: show.showPrice || 250
    }))
    .sort((a, b) => a.time.localeCompare(b.time));

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDayNum = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading shows...</div>;

  return (
    <div className="min-h-screen  pt-28 px-6 md:px-16 lg:px-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050507] to-[#050507]">
        <button 
            onClick={() => {navigate(-1),scrollTo(0, 0)}}
            className="cursor-pointer mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
            <ArrowLeft className="w-5 h-5" /> Back to Movie
        </button>

        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Select Date & Time</h1>
            <p className="text-gray-400 mb-10">Choose from available real-time showtimes.</p>

            {availableDates.length > 0 ? (
                <>
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold text-white">Select Date</h2>
                        </div>
                        
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                            {availableDates.map(date => {
                                const isSelected = selectedDate === date;
                                return (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(date)}
                                        className={`
                                            flex flex-col items-center justify-center min-w-[80px] h-[100px] rounded-2xl border transition-all duration-300
                                            ${isSelected 
                                                ? "bg-primary text-white border-primary shadow-[0_0_20px_rgba(248,69,101,0.4)] scale-105" 
                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30"}
                                        `}
                                    >
                                        <span className="text-sm font-medium uppercase">{getDayName(date)}</span>
                                        <span className="text-2xl font-bold mt-1">{getDayNum(date)}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`transition-all duration-500`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold text-white">Select Time</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {availableTimes.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => {navigate(`/seats/${movieId}?date=${selectedDate}&time=${slot.time}`); scrollTo(0, 0);}}

                                    className="group cursor-pointer relative px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden text-center"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                    <span className="relative z-10 text-lg font-medium text-white group-hover:text-primary transition-colors">
                                        {slot.time}
                                    </span>
                                    <span className="block text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Available</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center py-20 bg-white/2 border border-white/5 rounded-3xl flex flex-col items-center justify-center">
                    <p className="text-gray-400 mb-6">No shows currently scheduled for this movie.</p>
                    <button
                        onClick={() => {navigate("/"); scrollTo(0, 0)}}
                        className="px-8 py-3 bg-primary text-white rounded-full font-medium shadow-[0_0_15px_rgba(248,69,101,0.4)] hover:shadow-[0_0_25px_rgba(248,69,101,0.6)] transition-all duration-300 hover:-translate-y-1"
                    >
                        View Now Showing Movies
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default SelectShow;
