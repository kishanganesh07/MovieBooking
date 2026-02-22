import { PlusCircle, Search, Film, MapPin, DollarSign, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BackendUrl } from "../../config";
import { motion, AnimatePresence } from "framer-motion";

const Addshows = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [showPrice, setShowPrice] = useState(150);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`${BackendUrl}/api/movies`, {
                    credentials: "include",
                });
                const data = await res.json();
                setMovies(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMovies();
    }, []);

    const toggleDate = (date) => {
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter(d => d !== date));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
    };

    const toggleSlot = (slot) => {
        if (selectedSlots.includes(slot)) {
            setSelectedSlots(selectedSlots.filter(s => s !== slot));
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedMovie) return toast.error("Please select a movie");
        if (selectedDates.length === 0) return toast.error("Please select at least one date");
        if (selectedSlots.length === 0) return toast.error("Please select at least one slot");
        
        setIsLoading(true);
        try {
            const shows = [];
            selectedDates.forEach(date => {
                selectedSlots.forEach(slot => {
                    const showDateTime = new Date(`${date}T${slot}`).toISOString();
                    shows.push({
                        movie: selectedMovie._id,
                        showDateTime,
                        showPrice
                    });
                });
            });

            const res = await fetch(`${BackendUrl}/api/shows/bulk`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ shows }),
            });

            if (res.ok) {
                toast.success(`${shows.length} shows added successfully! 🎉`);
                setSelectedMovie(null);
                setSelectedDates([]);
                setSelectedSlots([]);
                setShowPrice(150);
            } else {
                const data = await res.json();
                toast.error(data.message || "Failed to add shows");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredMovies = movies.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

    // Generate next 7 days
    const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d.toISOString().split("T")[0];
    });

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Bulk Add Shows</h1>
                <p className="text-gray-400 mt-1">Schedule multiple screenings across dates and slots.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Movie Selection Panel */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-dark-surface border border-white/10 rounded-3xl p-6">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">1. Select Movie</label>
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input 
                                type="text"
                                placeholder="Search movies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-dark-bg border border-white/10 rounded-2xl outline-none focus:ring-2 focus:ring-primary/50 text-white transition-all"
                            />
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                            {filteredMovies.map(movie => (
                                <button
                                    key={movie._id}
                                    onClick={() => setSelectedMovie(movie)}
                                    className={`w-full flex items-center gap-4 p-3 rounded-2xl border transition-all ${
                                        selectedMovie?._id === movie._id 
                                        ? 'bg-primary/20 border-primary text-white' 
                                        : 'bg-white/2 border-white/5 text-gray-400 hover:bg-white/5 hover:border-white/10'
                                    }`}
                                >
                                    <img src={movie.poster_path} alt="" className="w-12 h-16 rounded-lg object-cover shadow-lg" />
                                    <div className="text-left overflow-hidden">
                                        <p className="font-bold truncate text-sm">{movie.title}</p>
                                        <p className="text-[10px] uppercase tracking-wider opacity-60">{new Date(movie.release_date).getFullYear()}</p>
                                    </div>
                                    {selectedMovie?._id === movie._id && <CheckCircle2 className="w-5 h-5 text-primary ml-auto flex-shrink-0" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedMovie && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary/10 border border-primary/30 rounded-3xl p-6 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Film className="w-20 h-20 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{selectedMovie.title}</h3>
                            <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">{selectedMovie.overview}</p>
                        </motion.div>
                    )}
                </div>

                {/* Configuration Panel */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
                    <div className="bg-dark-surface border border-white/10 rounded-3xl p-6 md:p-8 relative min-h-[500px] flex flex-col">
                        <div className="mb-8">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">2. Bulk Configuration</label>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Dates</label>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                    {nextSevenDays.map(date => {
                                        const d = new Date(date);
                                        const isSelected = selectedDates.includes(date);
                                        return (
                                            <button
                                                key={date}
                                                type="button"
                                                onClick={() => toggleDate(date)}
                                                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                                                    isSelected 
                                                    ? "bg-primary text-white border-primary" 
                                                    : "bg-dark-bg text-gray-400 border-white/10 hover:border-white/20"
                                                }`}
                                            >
                                                <span className="text-[8px] uppercase font-bold">{d.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                                <span className="text-xs font-bold">{d.getDate()}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Select Slots</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {["10:30", "14:00", "18:30", "22:00"].map(slot => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => toggleSlot(slot)}
                                            className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                                                selectedSlots.includes(slot)
                                                ? "bg-primary text-white border-primary" 
                                                : "bg-dark-bg text-gray-400 border-white/10 hover:border-white/20"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Ticket Price (₹)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                                    <input 
                                        type="number"
                                        value={showPrice}
                                        onChange={(e) => setShowPrice(Number(e.target.value))}
                                        placeholder="150"
                                        className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-white/10 rounded-xl text-sm text-white focus:ring-1 focus:ring-primary outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/10">
                            <button
                                type="submit"
                                disabled={isLoading || !selectedMovie || selectedDates.length === 0 || selectedSlots.length === 0}
                                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <CheckCircle2 className="w-5 h-5" />
                                        Schedule {selectedDates.length * selectedSlots.length} Shows
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Hint Panel */}
            <div className="mt-8 mb-10 flex items-center gap-4 p-6 bg-primary/5 border border-primary/20 rounded-3xl">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-sm text-gray-400">
                    <strong className="text-primary tracking-wide uppercase text-[10px] mr-2">Bulk Logic:</strong> This will create a separate show entry for every combination of selected date and time slot.
                </p>
            </div>
        </div>
    );
};

export default Addshows;
