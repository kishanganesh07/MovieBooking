import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Share2, Heart, Calendar } from "lucide-react";
import Loading from "./Loading";
import { BackendUrl } from "../config";
import { useNavigate } from "react-router-dom";

const Comingsoon = () => {
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/coming-soon-movies`, {
          credentials: "include",
        });
        const data = await res.json();
        // Limit to 4 movies for the UI (or adjust as needed)
        setMoviesToShow(data.slice(0, 4));
        setLoading(false);
      } catch (e) {
        console.log("Error in fetching in coming soon movies", e);
      }
    };
    fetchMovies();
  }, []);
  if(loading) return (
    <Loading/>
  )
  return (
    <div className="py-20 px-6 md:px-16 lg:px-36 bg-gradient-to-b from-dark-bg to-black/50 overflow-hidden">
      <motion.div
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Coming Soon
          </h2>
          <div className="flex items-center gap-3">
            <div className="h-1 w-16 bg-primary rounded-full" />
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black text-xs font-extra-bold uppercase tracking-widest rounded-sm shadow-lg shadow-yellow-500/20">
              Exclusive For TFI Fans
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-sm md:text-base max-w-sm text-right">
          Get ready for the biggest blockbusters from the Tollywood Film
          Industry.
        </p>
      </motion.div>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {moviesToShow.map((movie, index) => (
          <motion.div
            key={movie._id}
            onClick={() => {
              navigate(`/movies/${movie._id}`);
              scrollTo(0, 0);
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-white/5"
          >
            <img
              src={movie.backdrop_path || movie.poster_path}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-primary/80 backdrop-blur-md text-white text-xs font-bold rounded-full">
                    {movie.genres?.[0]?.name || "Action"}
                  </span>
                  <div className="flex items-center gap-1 text-gray-300 text-xs font-medium">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{movie.release_date}</span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">
                  {movie.title}
                </h3>

                <p className="text-gray-400 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {movie.overview}
                </p>

                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-4 border-t border-white/10">
                  <button className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-0 overflow-hidden">
              <div className="bg-gradient-to-bl from-yellow-500 to-transparent w-24 h-24 absolute top-0 right-0 -mr-12 -mt-12 rotate-45" />
              {/* Styling flare */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Comingsoon;
