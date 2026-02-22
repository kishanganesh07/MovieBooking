import React from 'react'
import Adminnavbar from '../../Components/Admin/Adminnavbar'
import Adminsidebar from '../../Components/Admin/Adminsidebar'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const Layout = () => {
  return (
    <div className='min-h-screen bg-dark-bg text-white relative overflow-hidden'>
      <Adminnavbar/>
      <div className='flex relative z-10'>
          <Adminsidebar/>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide'
          >
              <Outlet/>
          </motion.div>
      </div>
    </div>
  )
}

export default Layout
