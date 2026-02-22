import React from 'react'
import HeroSection from '../Components/HeroSection'
import Featured from '../Components/Featured'
import MovieCard from '../Components/MovieCard'
import TrailersSection from '../Components/TrailersSection'
import HomeheroPage from '../Components/HomeheroPage'
import TrendingnowSection from '../Components/TrendingnowSection'
import TopIndianMovies from '../Components/topIndianMovies'
import Comingsoon from '../Components/Comingsoon'
const Home = () => {
  return (
    <div className='bg-dark-bg min-h-screen overflow-x-hidden'>
     <HomeheroPage/>
     <TrendingnowSection/>
      <Featured/>
      <TopIndianMovies/>
      <Comingsoon/>
      <TrailersSection/>
    </div>
  )
}

export default Home
