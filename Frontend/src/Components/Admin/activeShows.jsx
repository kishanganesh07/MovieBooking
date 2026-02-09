import { Currency, StarIcon } from 'lucide-react'
import React from 'react'
import dateFormat from '../../Libary/dateFormat'
import {useNavigate} from "react-router-dom"

const activeShows = ({show}) => {
    const navigate=useNavigate()
  return (
     <div className='relative flex flex-wrap gap-6 mt-4 max-w-5xl hover:transition duration-300'>
        <div className='w-55 rounded-lg overflow-hidden h-full pb-3 bg-red-500/20  hover:-translate-y-1 transition duration-300 cursor-pointer' onClick={()=> navigate(`/movies/${show.movie.id}`)}>
        <img src={show.movie.poster_path } className='h-60 w-full object-cover' alt="" />
        <p className='font-medium p-2 '>{show.movie.title}</p>
        <div className='flex items-center justify-between px-2'>
            <p className='text-lg font-medium'>${show.showPrice}</p>
            <p className='flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1'><StarIcon className='w-4 h-4 text-red-500 fill-primary'/>{show.movie.vote_average.toFixed(1)} </p>

        </div>
        <p className='px-2 pt-2 text-sm text-gray-500'>{dateFormat(show.showDateTime)}</p>
          
        </div>

      </div>
  )
}

export default activeShows
