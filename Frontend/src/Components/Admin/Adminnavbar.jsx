import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { Bell, Search, User } from 'lucide-react'

const Adminnavbar = () => {
  return (
    <div className='flex items-center justify-between px-6 md:px-10 h-16 bg-dark-surface border-b border-white/5 sticky top-0 z-50'>
        <div className='flex items-center gap-8'>
            <Link to="/">
                <img src={assets.logo} alt="logo" className='w-28 h-auto hover:opacity-80 transition-opacity' />
            </Link>
           
        </div>

        <div className='flex items-center gap-4'>
            
            <div className='flex items-center gap-3 pl-4 border-l border-white/10'>
                <div className='hidden md:block text-right'>
                    <p className='text-sm font-medium text-white'>Admin</p>
                    <p className='text-[10px] text-gray-500 uppercase tracking-widest font-bold'>Super User</p>
                </div>
                <div className='w-8 h-8 rounded-full bg-primary/20 p-[1px]'>
                    <div className='w-full h-full rounded-full bg-dark-bg flex items-center justify-center overflow-hidden'>
                        <img src={assets.profile} alt="Profile" className='w-full h-full object-cover' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Adminnavbar
