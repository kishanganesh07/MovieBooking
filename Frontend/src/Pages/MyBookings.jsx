import React, { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Components/Loading'
import { Currency } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import timeFormat from '../Libary/timeFormat';
import { IndianRupee } from 'lucide-react';
const MyBookings = () => {
        const [bookings,setBookings]=useState([])
        const [isLoading,setIsLoading]=useState(true)
        const navigate=useNavigate()
      useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/bookings/my-bookings", {
          credentials: "include", 
        });
        if (res.status === 401) {
        navigate("/login");
        return;
      }
       const data = await res.json();
        setBookings(data);
        setIsLoading(false)
        
      } catch (error) {
        console.error(error);
      } 
    };

    fetchMyBookings();
  }, []);
        
  if (isLoading) return <Loading />;

  return(
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh] '>
      <h1 className='text-lg font-semibold mb-4 '>My Bookings</h1>
      {bookings.length === 0 ? (
  <div className="text-center text-gray-400 pt-50">
    <p className="text-lg font-medium">No bookings yet 🎬</p>
    <p className="text-sm mt-2">
      Book a movie to see your tickets here.
    </p>
  </div>
):(bookings.map((booking)=>(
            <div key={booking._id} className='flex flex-col md:flex-row justify-between bg-gray-300/20 border border-white-400 rounded-lg mt-4 p-2 max-w-3xl '>
                <div className='flex flex-col md:flex-row'>
                    <img src={booking.movie.poster_path} alt=""  className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
                    <div className='flex flex-col p-8'>
                        <p className='text-lg font-semibold'>{booking.movie.title}</p>
                        <p className='text-gray-400 text-sm'>{timeFormat(booking.movie.runtime)}</p>
                        <p className='text-gray-400 text-sm mt-auto'> {new Date(booking.showDate).toDateString()} • {booking.showTime}</p>
                    </div>
                </div>
                <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                  <div className='flex items-center gap-4 '>
                    <p className='flex items-center text-2xl font-semibold mb-3'><IndianRupee className='w-6 h-6 mr-1' />{booking.totalPrice}</p>
                    
                  </div>
                  <div className='text-sm '>
                    <p><span className='text-gray-400'>Total Tickets:</span>{booking.bookedSeats.length}</p>
                    <p><span className='text-gray-400'>Seat Number:</span>{booking.bookedSeats.join(", ")}</p>
                    <p className="text-sm text-gray-400">
  Transaction ID: {booking.transactionId}
</p>

                  </div>
                </div>
            </div>
      )))}
     
    </div>
  )
}

export default MyBookings
