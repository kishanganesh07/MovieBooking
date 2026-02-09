import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../assets/assets'
import Loading from '../../Components/Loading'
import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, UsersIcon } from 'lucide-react'
import ActiveShows from '../../Components/Admin/activeShows'
const Dashboard = () => {
  const [dashBoardData,setDashboardData]=useState({totalBookings:0,totalRevenue:0,activeShows:[],totalUsers:0})
  const [loading,setLoading]=useState(true)
  const fetchDashboardData=async()=>{
        setDashboardData(dummyDashboardData)
        setLoading(false)
  }
  useEffect(()=>{
        fetchDashboardData();
  },[])
  return !loading ? (
    <>
      <h1 className='font-medium text-2xl'>Admin <span className=' text-red-500'>Dashboard</span></h1>
      <div className='relative flex flex-wrap gap-15 w-full mt-15'>
        <div className='flex items-center justify-between px-4 py-3 bg-gray-600/10 border rounded-md max-w-50 w-full'>
          <div>
            <h1 className='text-sm'>Total Bookings</h1>
            <p className='text-xl font-medium mt-1'>{dashBoardData.totalBookings}</p>
          </div>
          <ChartLineIcon className='w-6 h-6'/>
        </div>
        <div className='flex items-center justify-between px-4 py-3 bg-gray-600/10 border rounded-md max-w-50 w-full mr-5'>
          <div>
            <h1 className='text-sm'>Total Revenue</h1>
            <p className='text-xl font-medium mt-1'>{dashBoardData.totalRevenue}</p>
          </div>
          <CircleDollarSignIcon className='w-6 h-6'/>
        </div>
        <div className='flex items-center justify-between px-4 py-3 bg-gray-600/10 border rounded-md max-w-50 w-full mr-5'>
          <div>
            <h1 className='text-sm'>Active Shows</h1>
            <p className='text-xl font-medium mt-1'>{dashBoardData.activeShows.length}</p>
          </div>
          <PlayCircleIcon className='w-6 h-6'/>
        </div>
        <div className='flex items-center justify-between px-4 py-3 bg-gray-600/10 border rounded-md max-w-50 w-full mr-5'>
          <div>
            <h1 className='text-sm'>Total Users</h1>
            <p className='text-xl font-medium mt-1'>{dashBoardData.totalUsers}</p>
          </div>
          <UsersIcon className='w-6 h-6'/>
        </div>


      </div>
      <p className='mt-10 text-lg font-medium '>Active Shows</p>
      <div className='flex gap-5 lg:flex flex-wrap'>
      {dashBoardData.activeShows.map((shows)=>(
      <ActiveShows key={shows._id } show={shows}/>

      ))}
      </div>
    </>
  ):<Loading/>
}

export default Dashboard
