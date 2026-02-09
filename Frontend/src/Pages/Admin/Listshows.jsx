import React, { useEffect, useState } from 'react'
import Loading from '../../Components/Loading';
import dateFormat from '../../Libary/dateFormat';
import { dummyShowsData } from '../../assets/assets';
const Listshows = () => {
  const [shows,setShows]=useState([]);
  const [loading,setLoading]=useState(false)
  const getAllShows=async ()=>{
    setShows([{
      movie: dummyShowsData[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59,
      occupiedSeats:
      {
      A1: "user_1",
      B1: "user_2",
      C1: "user_3" 
    }
    }])
    setLoading(false)
  }
  useEffect(()=>{
    getAllShows()
  },[])
  return !loading ? (
    <>
      <h1 className='font-medium text-2xl'>Shows <span className=' text-red-500'>List</span></h1>
      <div className='max-w-4xl mt-15 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap mb-2'>
          <thead>
            <tr className='bg-gray-400 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium '>Show Time</th>
              <th className='p-2 font-medium '>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>


            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {shows.map((show,index)=>(
              <tr key={index} className=''>
                <td className='p-2 min-w-45 pl-5'>
                  {show.movie.title}

                </td>
                <td className='p-2 min-w-45 pl-5'>
                  {dateFormat(show.showDateTime)}

                </td>
                <td className='p-2 min-w-45 pl-5'>
                    {Object.keys(show.occupiedSeats).length}

                </td>
                <td className='p-2 min-w-45 pl-5'>
                    {Object.keys(show.occupiedSeats).length * show.showPrice}
                </td>


              </tr>
            ))}

          </tbody>

        </table>

      </div>

      
    </>
  ):<Loading/>
}

export default Listshows
