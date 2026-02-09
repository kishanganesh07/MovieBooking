import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from "../Components/MovieCard"
const Movies = () => {
  const [movie,setMovie]=useState([])
  useEffect(()=>{
      const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/movies");

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await res.json();
        setMovie(data);
       
      } catch (error) {
        console.error("Error fetching movies:", error);
        
      }
    };

    fetchMovies();
  })
    return movie.length > 0 ? (
    <div className='relative my-25 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
<h1 className='text-lg font-medium my-4'>Now Showing </h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8 lg:m-15'>
        {movie.map((movies)=>(<MovieCard movie={movies} key={movie._id}/>))}
      </div>
    </div>
    
  ):(
<div className='flex flex-col items-center justify-center h-screen '>
  <h1 className='text-3xl font-bold text-center '>No Movies Available</h1>
</div>
  )
}

export default Movies
