import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import MovieCard from "./MovieCard";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Loading from './Loading';
import { BackendUrl } from "../config";

const TopIndianMovies = () => {
    const navigate=useNavigate()
    const [movies,setMovies]=useState()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchMovies=async()=>{
            try{
                const res = await fetch(`${BackendUrl}/api/movies`, { credentials: 'include' });
                const data = await res.json();
                setMovies(data.slice(10, 18));
                setLoading(false);

            }catch(e){
                console.log("Failed to fetch top indian movies:",e)
            }
        }
        fetchMovies()
    },[])
      if (loading) return <Loading />;

  return (
    <div className="my-16 sm:my-24 relative z-10 w-full overflow-hidden">
        <motion.div 
        className="flex items-end justify-between px-6 md:px-16 lg:px-36 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Top Indian Movies
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full" />
        </div>
        
        <Link to="/movies" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
            <span className="text-sm md:text-base font-medium">View All</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
      <div className='flex flex-wrap justify-center gap-8 px-6 md:px-16 lg:px-36'>
       {movies?.map((movie,index)=>(
        <motion.div key={movie._id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:index*0.1}}>
            <MovieCard movie={movie}/>

        </motion.div>
       ))}
      </div>

      
    </div>
  )
}

export default TopIndianMovies
