import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from "../Components/MovieCard"
import { useNavigate } from 'react-router-dom'
import { BackendUrl } from "../config";
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
   return favouriteMovies.length > 0 ? (
    <div className='relative my-25 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
<h1 className='text-lg font-medium my-4'>Your Favourite Movies </h1>
      <div className='flex flex-wrap max-sm:justify-center gap-8 lg:m-15'>
        {favouriteMovies.map((movie)=>(<MovieCard movie={movie} key={movie._id}/>))}
      </div>
    </div>
    
  ):(
<div className='flex flex-col items-center justify-center h-screen '>
  <h1 className='text-3xl font-bold text-center '>No Movies Available</h1>
</div>
  )
}

export default Favorite
