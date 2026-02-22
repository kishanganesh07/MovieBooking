import React, { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../Components/Loading'
import { Currency } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import timeFormat from '../Libary/timeFormat';
import { IndianRupee, QrCode, Ticket, CheckCircle } from 'lucide-react';
import { BackendUrl } from "../config";

const MyBookings = () => {
        const [bookings,setBookings]=useState([])
        const [isLoading,setIsLoading]=useState(true)
        const navigate=useNavigate()
      useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/bookings/my-bookings`, {
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
      <div className='min-h-screen pt-28 px-4 md:px-16 lg:px-40 pb-20 '>
        <h1 className='text-3xl font-bold mb-8 text-white flex items-center gap-3'>
          <Ticket className='w-8 h-8 text-primary'/>
          My Bookings

        </h1>
        {bookings.length===0?(
          <div className='flexb flex-col items-center justify-center mt-20 p-10 bg-white/5 border border-white/10 rounded-2xl'>
              <div className='w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6'>
                <Ticket className='w-10 h-10 text-gray-500'/>
                </div>
                <p className='text-xl font-medium text-white'>No Bookings Yet</p>
                <p className='text-gray-400 mt-2 mb-6 '>Book a movie to see your tickets here</p>
                <button className='px-6 py-2 bg-primary rounded-full text-white font-medium hover:bg-primary-dull transistion-colors' onClick={()=>navigate('/movies')}>Browse Movies</button>
          </div>

        ):(
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            if (!booking.movie) return null;
            return (
              <div className='relative flex flex-col md:flex-row bg-[#1A1A1D] rounded-xl overflow-hidden border border-white/10 hover:border-primary/30 transistion-all duration-300 group '>
                <div className='relative w-full md:w-48 aspect-[2/3] md:aspect-auto'>
                  <img src={booking.movie.poster_path} alt={booking.movie.title} className='w-full h-full object-cover' />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />


                </div>
                <div className='flex-1 p-6 flex flex-col jsutify-between border-r border-dashed border-white/10 relative'>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#09090B] rounded-full"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#09090B] rounded-full"></div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Date</span>
                      <span className="text-gray-200 font-medium">{new Date(booking.showDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Time</span>
                      <span className="text-gray-200 font-medium">{booking.showTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-sm">Seats</span>
                      <span className="text-primary font-bold">{booking.bookedSeats.join(", ")}</span>
                    </div>
                  </div>

                </div>
                <div className="p-6 bg-[#151518] flex flex-col items-center justify-center gap-4 min-w-[140px] border-l border-dashed border-white/10">
                  <div className="p-2 bg-white rounded-lg">
                    <QrCode className="w-20 h-20 text-black" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Booking ID</p>
                    <p className="text-xs text-white font-mono">{booking.transactionId ? booking.transactionId.slice(-8).toUpperCase() : 'N/A'}</p>
                  </div>
                </div>

              </div>
            )
          })}
         </div>
        )}
      </div>
  )
}

export default MyBookings
