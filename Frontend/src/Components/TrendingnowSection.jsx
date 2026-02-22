import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Loading from "./Loading";
import { BackendUrl } from "../config";

const TrendingnowSection = () => {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/movies`, {
          credentials: "include",
        });
        const data = await res.json();
        setTrendingMovies(data.slice(0,7));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };
    fetchMovies();
  }, []);
   if (loading) return <Loading />;
  return (
    <div className="mb-24 px-6 md:px-16 lg:px-36 overflow-hidden ">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Trending Now
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full" />
      </motion.div>
      <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory">
        {trendingMovies.map((movie,index)=>(
            <motion.div  key={movie._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className='relative flex-shrink-0 w-[160px] md:w-[200px] snap-center group'>
            <span className='absolute -left-8 bottom-0 text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-800 to-transparent opacity-50 z-0 leading-none select-none group-hover:from-primary/20 transition-colors duration-300'>
                            {index + 1}
                        </span>
                         <div 
                            className='relative z-10 w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border border-white/5 transition-transform duration-300 group-hover:-translate-y-4 group-hover:shadow-primary/20 cursor-pointer'
                            onClick={() => {
                                navigate(`/movies/${movie._id}`);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <img 
                                src={movie.poster_path} 
                                alt={movie.title} 
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                                <p className='text-white font-bold text-sm line-clamp-2'>{movie.title}</p>
                            </div>
                        </div>
                
            </motion.div>
        ))}

      </div>
    </div>
  );
};

export default TrendingnowSection;
