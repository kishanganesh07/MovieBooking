import React, { useEffect, useState } from 'react'
import MovieCard from "../Components/MovieCard"
import { useNavigate } from 'react-router-dom'
import { BackendUrl } from "../config";
import { motion } from "framer-motion";

const Movies = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const [movieRes, showRes, comingSoonRes] = await Promise.all([
          fetch(`${BackendUrl}/api/movies`, { credentials: "include" }),
          fetch(`${BackendUrl}/api/shows`, { credentials: "include" }),
          fetch(`${BackendUrl}/api/coming-soon-movies`, { credentials: "include" })
        ]);

        if (movieRes.status === 401) {
          navigate("/login");
          return;
        }

        const moviesData = await movieRes.json();
        const showsData = await showRes.json();
        const comingSoonData = await comingSoonRes.json();
        const now = new Date();

        // Get unique movie IDs from upcoming shows
        const activeMovieIds = new Set(
          showsData
            .filter(show => new Date(show.showDateTime) >= now)
            .map(show => show.movie?._id)
        );

        // Filter movies that have at least one active show
        const activeMovies = moviesData.filter(movie => activeMovieIds.has(movie._id));

        setNowShowing(activeMovies);
        setAllMovies(moviesData);
        setComingSoon(comingSoonData);
      } catch (error) {
        console.error("Error fetching movies and shows:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading Movies...</div>;

  return (
    <div className='relative pt-24 pb-40 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh] bg-dark-bg'>
      {/* Background Glows */}
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Now Showing Section */}
        {nowShowing.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className='text-3xl font-bold text-white'>Now Showing</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
            </div>
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
              {nowShowing.map((m) => (
                <MovieCard movie={m} key={`showing-${m._id}`} />
              ))}
            </div>
          </div>
        )}

        {/* All Movies Section */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-8 text-center sm:text-left">
            <h2 className='text-3xl font-bold text-white'>Explore All Movies</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-gray-500 to-transparent rounded-full mt-2" />
          </div>
          
          {allMovies.length > 0 ? (
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
              {allMovies.map((m) => (
                <MovieCard  movie={m} key={`all-${m._id}`} />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center h-64'>
              <h1 className='text-3xl font-bold text-gray-500'>No Movies Available</h1>
            </div>
          )}
        </div>

        {/* Coming Soon Section */}
        {comingSoon.length > 0 && (
          <div className="relative mt-20">
            <div className="flex items-center gap-4 mb-8 text-center sm:text-left">
              <h2 className='text-3xl font-bold text-white'>Coming Soon</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-yellow-500 to-transparent rounded-full mt-2" />
            </div>
            
            <div className='flex flex-wrap max-sm:justify-center gap-8'>
              {comingSoon.map((m) => (
                <MovieCard movie={m} key={`coming-${m._id}`} />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Movies;

