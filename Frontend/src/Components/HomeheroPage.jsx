import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { BackendUrl } from "../config";

const HomeheroPage = () => {
    const navigate = useNavigate(); 
    const [promoMovies,setPromoMovies] = useState([]);
    useEffect(()=>{
        const fetchMovies=async()=>{
            try{
                const res=await fetch(`${BackendUrl}/api/movies`, { credentials: 'include' });
                    const data=await res.json();
                    setPromoMovies(data.slice(1,4));
            }catch(error){

                 console.error("Failed to fetch promo movies:", error);


            }
        }
        fetchMovies();
    }, [])
  return (
    <div className='relative w-full min-h-screen flex items-center pt-28 pb-16 px-6 md:px-16 lg:px-36 bg-dark-bg overflow-hidden'>
          <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none' />
            <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none' />
            
            <div className='relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full'>
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className='flex flex-col gap-4 sm:gap-6 lg:gap-8'
                >
                    <h2 className='text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-white'>
                        Get your tickets <br />
                        to the show: <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dull'>
                            Book your movie experience now!
                        </span>
                    </h2>
                    
                    <p className='text-sm sm:text-base md:text-lg text-gray-400 max-w-md leading-relaxed'>
                        Don't miss out on the latest blockbusters. Secure the best seats in the house with our seamless booking experience.
                    </p>

                    <button 
                        onClick={() => navigate('/movies')}
                        className='self-start px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 cursor-pointer bg-white text-black rounded-full text-sm sm:text-base font-bold hover:bg-gray-200 transition-colors duration-300 shadow-lg shadow-white/10'
                    >
                        Explore All Movies
                    </button>
                </motion.div>

                {/* Right Content - Bento Grid */}
<img
  src="https://res.cloudinary.com/dvbmbe4cl/image/upload/v1771494941/055fa94146f0382cb55ea075b04bce18_zvznqu.jpg"
  alt="Hero"
  className="hidden lg:block w-full max-w-sm lg:max-w-md xl:max-w-[500px] h-auto rounded-2xl shadow-2xl mx-auto lg:ml-auto lg:mr-0 object-cover"
/>
            </div>
      
    </div>
  )
}

export default HomeheroPage
