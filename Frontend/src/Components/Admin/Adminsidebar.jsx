import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboard, PlusSquareIcon, ListIcon, ListCollapseIcon, Group, LogOut, Settings } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Adminsidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
        { name: 'Shows List', path: '/admin/list-shows', icon: ListIcon },
        { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
        { name: 'Users List', path: '/admin/list-users', icon: Group },
    ];

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col pt-8 max-w-16 md:max-w-64 w-full bg-dark-surface border-r border-white/5 transition-all duration-300'>
        <div className='flex flex-col items-center px-4 mb-10'>
            <div className='relative group'>
                <img src={assets.profile} alt="Admin" className="h-12 md:h-16 w-12 md:w-16 rounded-full border-2 border-white/10 object-cover" />
            </div>
            <p className='mt-4 text-sm font-bold text-gray-400 max-md:hidden tracking-wider text-center uppercase'>Admin Control</p>
        </div>

        <nav className='flex-1 px-3 space-y-1'>
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isActive 
                            ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <item.icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
                        <span className={`text-sm font-medium max-md:hidden`}>
                            {item.name}
                        </span>
                    </Link>
                )
            })}
        </nav>

        <div className='p-4 border-t border-white/5 space-y-2'>
           
            <button className='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all text-sm font-medium'>
                <LogOut className='w-5 h-5' />
                <span className='max-md:hidden'>Sign Out</span>
            </button>
        </div>
    </div>
  )
}

export default Adminsidebar
