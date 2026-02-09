import React from 'react'
import HeroSection from '../Components/HeroSection'
import Featured from '../Components/Featured'
import MovieCard from '../Components/MovieCard'
import TrailersSection from '../Components/TrailersSection'

const Home = () => {
  return (
    <div className=''>
      <HeroSection/>
      <Featured/>
      <MovieCard/>
      <TrailersSection/>
    </div>
  )
}

export default Home
