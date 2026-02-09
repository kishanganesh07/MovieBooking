import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../Components/Loading'
import dateFormat from '../../Libary/dateFormat'
const Listbookings = () => {
  const [bookings,setBookings]=useState([])
  const [isLoading,setLoading]=useState(true)
  const getBookingsList=async()=>{
    setBookings(dummyBookingData)
    setLoading(false)
  }
  useEffect(()=>{
    getBookingsList()
  },[])

  return !isLoading? (

    <>
        <h1 className='font-medium text-2xl'>List <span className=' text-red-500'>Bookings</span></h1>
        <div className='max-w-4xl mt-6 overflow-x-auto'>
          <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap mt-10'>
            <thead>
              <tr className='bg-gray-400 text-left text-white'>
                  <th className="p-2 font-medium pl-5">User Name</th>
                  <th className="p-2 font-medium">Movie Name</th>
                  <th className="p-2 font-medium">Show Time</th>
                  <th className="p-2 font-medium">Seats</th>
                  <th className="p-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className='text-sm font-light'>
            {bookings.map((item,index)=>(
              <tr key={index} className=''>
                <td className='p-2'>
                  {item.user.name}

                </td>
                <td  className='p-2'>{item.show.movie.title}</td>
                <td className='p-2 '>
                  {dateFormat(item.show.showDateTime)}

                </td>
                <td className='p-2 '>
                    {Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]).join(",")}

                </td>
                <td className='p-2'>
                     $ {item.amount}
                </td>


              </tr>
            ))}

          </tbody>

          </table>

        </div>

      
    </>
  ):<Loading/>
}

export default Listbookings
