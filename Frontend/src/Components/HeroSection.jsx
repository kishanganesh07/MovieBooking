import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
const HeroSection = () => {
  return (
    <div className='bg-[url("/backgroundImage.png")] bg-cover bg-center h-screen min-h-screen flex items-center '>
    <div className='flex flex-col justify-center gap-4 px-6 md:px-16 lg:px-36 '>
        <div className='py-15 md:py-20'>
      <img src={assets.marvelLogo} alt="" className='h-8 sm:h-10 lg:h-11 mb-5'/>
      <h1 className='text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110 my-5'>Guradians <br />of the Galary </h1>
      <div className='flex items-center gap-4 text-gray-300 '>
        <span>Action | Adventure | Sci-Fi</span>
        <div className='flex items-center gap-1'>
            <CalendarIcon  className="w-4.5 h-4.5 "/> 2018

        </div>
        <div className='flex items-center gap-1'>
            <ClockIcon  className="w-4.5 h-4.5 "/> 2h 8m

        </div>

      </div>
      <p className='max-w-md text-sm sm:text-base text-gray-300 mt-4'>In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.</p>
      <Link to="/movies">
      <button className='flex items-center gap-2 mt-6 bg-red-600 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 hover:bg-red-500 transition text-sm sm:text-base cursor-pointer'>Explore Movies <ArrowRight className='h-4 w-4 sm:h-5 sm:w-5'/></button>
      </Link>
      </div>
    </div>
    </div>
  )
}

export default HeroSection
