import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import Loading from "./Loading.jsx";
import { motion } from "framer-motion";
import { BackendUrl } from "../config";

const Featured = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        
        const [movieRes, showRes] = await Promise.all([
          fetch(`${BackendUrl}/api/movies`, { headers, credentials: "include" }),
          fetch(`${BackendUrl}/api/shows`, { headers, credentials: "include" })
        ]);

        if (movieRes.status === 401) {
          navigate("/login");
          return;
        }

        const allMovies = await movieRes.json();
        const allShows = await showRes.json();
        const now = new Date();

        // Get unique movie IDs from upcoming shows
        const activeMovieIds = new Set(
          allShows
            .filter(show => new Date(show.showDateTime) >= now)
            .map(show => show.movie?._id)
        );

        // Filter movies that have at least one active show
        const activeMovies = allMovies.filter(movie => activeMovieIds.has(movie._id));

        setMovies(activeMovies);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };
    getData();
  }, [navigate]);

  if (isLoading) {
    return <Loading />;
  }

  // Hide the entire section if no movies have active shows
  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="my-16 sm:my-24 relative z-10">
      <motion.div 
        className="flex items-end justify-between px-6 md:px-16 lg:px-36 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Now Showing
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
        </div>
        
        <Link to="/movies" className="group flex  items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300">
          
            <span className="text-sm md:text-base font-medium">View All
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        </Link>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8 px-6 md:px-16 lg:px-36">
        {movies.slice().map((show, index) => (
          <motion.div
            key={show._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MovieCard movie={show} />
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="flex justify-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {/* <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className="px-10 py-3 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
        >
          View More Movies
        </button> */}
      </motion.div>
    </section>
  );
};

export default Featured;
