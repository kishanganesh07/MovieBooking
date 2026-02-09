import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../Components/Loading'
import dateFormat from '../Libary/dateFormat'
import { Currency } from 'lucide-react'
const MyBookings = () => {
        const [bookings,setBookings]=useState(null)
        const [isLoading,setIsLoading]=useState(true)
        const getMyBookings=async()=>{
          setBookings(dummyBookingData)
          setIsLoading(false)
        }
        useEffect(()=>{
          getMyBookings()
        },[])
  return !isLoading?(
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <h1 className='text-lg font-semibold mb-4 '>My Bookings</h1>
      {bookings.map((items,index)=>(
            <div key={index} className='flex flex-col md:flex-row justify-between bg-gray-300/20 border border-white-400 rounded-lg mt-4 p-2 max-w-3xl '>
                <div className='flex flex-col md:flex-row'>
                    <img src={items.show.movie.poster_path} alt=""  className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
                    <div className='flex flex-col p-8'>
                        <p className='text-lg font-semibold'>{items.show.movie.title}</p>
                        <p className='text-gray-400 text-sm'>{items.show.movie.runtime}</p>
                        <p className='text-gray-400 text-sm mt-auto'>{dateFormat(items.show.showDateTime)}</p>
                        
                    </div>
                </div>
                <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                  <div className='flex items-center gap-4 '>
                    <p className='flex items-center text-2xl font-semibold mb-3'><Currency className='w-6 h-6 mr-1' />{items.amount}</p>
                    
                  </div>
                  <div className='text-sm '>
                    <p><span className='text-gray-400'>Total Tickets:</span>{items.bookedSeats.length}</p>
                    <p><span className='text-gray-400'>Seat Number:</span>{items.bookedSeats.join(", ")}</p>
                    {!items.isPaid&& <button className='bg-red-500 px-4 py-1.5 mt-3 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}


                  </div>
                </div>
            </div>
      ))}
    </div>
  ):<Loading/>
}

export default MyBookings
