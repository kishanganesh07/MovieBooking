import { StarIcon } from 'lucide-react'
import React from 'react'
import {useNavigate} from "react-router-dom"
import timeFormat from '../Libary/timeFormat'
const MovieCard = ({movie}) => {
  const navigate=useNavigate()
  if (!movie) {
    return null
  }
  console.log(movie.title)
  return (
    <div >
    <div className='flex flex-col justify-between  p-5 bg-gray-800 rounded-2xl hover:-translate-y-1 transition duration-300 w-72.5 sm:w-45 md:w-50 lg:w-105 lg:h-full'>
      <img onClick={()=>{navigate(`/movies/${movie._id}`),scrollTo(0,0)}} src={movie.backdrop_path} alt=""  className='rounded-lg h-58 sm:h-52 w-full object-cover cursor-pointer' />
      <p className='font-semibold mt-2  text-sm sm:text-base'>{movie.title}</p>
      <p className='text-xs sm:text-sm text-gray-400 mt-2  '>
        {new Date(movie.release_date).getFullYear()}  • {movie.genres.slice(0,2).map(genre=>genre.name).join(" | ")} •  
         {timeFormat(movie.runtime)}
      </p>
      <div className="flex items-center justify-between mt-3 pb-3  ">
        <button  onClick={()=>{navigate(`/movies/${movie._id}`)}} className='px-4 py-2 text-xs bg-red-500 hover:bg-primary-dull transition rounded-full font-medium cursor-pointer '>Buy Tickets</button>
        <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1 '>
          <StarIcon className='w-4 h-4 text-primary fill-primary '
          />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
    </div>
  )
}

export default MovieCard
