import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from "../Components/MovieCard"
import { useNavigate } from 'react-router-dom'
import { BackendUrl } from "../config";
import { motion } from "framer-motion";

const Favorite = () => {
  const [favouriteMovies,setFavouriteMovies]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchFavourites=async()=>{
      try{
        const res=await fetch(`${BackendUrl}/api/favourites`,{credentials: "include", })
        const data=await res.json()
        if(res.status===401){
          navigate("/login")
        }
        setFavouriteMovies(data)


      }catch(e){
          console.error(e,"Error fetching favourites");
      }
    }
    fetchFavourites()

  },[])
   return (
    <div className='relative pt-24 pb-40 px-6 md:px-16 lg:px-36 overflow-hidden min-h-[80vh] bg-dark-bg'>
      {/* Background Glows */}
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none' />

      {favouriteMovies.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1400px] mx-auto relative z-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <h1 className='text-3xl font-bold text-white'>Your Favourite Movies</h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent rounded-full mt-2" />
          </div>
          
          <div className='flex flex-wrap justify-center gap-8'>
            {favouriteMovies.map((movie)=>(<MovieCard movie={movie} key={movie._id}/>))}
          </div>
        </motion.div>
      ) : (
        <div className='flex flex-col items-center justify-center h-[50vh] relative z-10'>
          <h1 className='text-3xl font-bold text-gray-500'>No Movies Available</h1>
        </div>
      )}
    </div>
   );
}

export default Favorite

