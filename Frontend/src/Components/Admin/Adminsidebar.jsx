import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboard, PlusSquareIcon,ListIcon, ListCollapseIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Adminsidebar = () => {
    const user={
        firstName:'Admin',
        lastName:"User",
        imageurl:assets.profile,
    }
  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm '>
        <img src={user.imageurl} alt="Sidebar" className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto " />
        <p className='mt-2 text-base max-md:hidden '>{user.firstName}</p>
        <div className='w-full'>
            <div className='relative flex items-center flex-col mt-10  max-md:justify-center gap-2 w-full py-5.5 mb-5  '>
                <div className='flex gap-2 text-center mb-3  w-35 rounded-lg '>
                    <LayoutDashboard/>
                   <Link to="/admin">
                    <h1 className='text-sm font-semibold cursor-pointer'>Dashboard</h1>
                    </Link>
                </div>
                <div className='flex gap-2 text-center mb-3  w-35 rounded-lg '>
                    <PlusSquareIcon/>
                    <Link to="/admin/add-shows">
                    <h1 className='text-sm font-semibold cursor-pointer'>Add Shows</h1>
                    </Link>
                </div>
                <div className='flex gap-2 text-center mb-3  w-35 rounded-lg '>
                    <ListIcon/>
                    <Link to="/admin/list-shows">
                    <h1 className='text-sm  font-semibold'> Shows List</h1>
                    </Link>
                </div>
                <div className='flex gap-2 text-center mb-3  w-35 rounded-lg '>
                    <ListCollapseIcon/>
                    <Link to="/admin/list-bookings">
                    <h1 className='text-sm font-semibold cursor-pointer'>List Bookings</h1>
                    </Link>
                </div>
                



            </div>

        </div>
      
    </div>
  )
}

export default Adminsidebar
