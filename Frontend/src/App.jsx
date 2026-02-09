import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import {Routes,Route,Link,useLocation} from "react-router-dom"
import MovieDetails from './Pages/MovieDetails'
import SeatLayoutPage from './Pages/SeatLayoutPage'
import MyBookings from './Pages/MyBookings'
import Favorite from './Pages/Favorite'
import Footer from "./Components/Footer"
import { Toaster} from "react-hot-toast"
import Layout from './Pages/Admin/Layout'
import Addshows from './Pages/Admin/addShows'
import Listshows from './Pages/Admin/Listshows'
import Listbookings from './Pages/Admin/Listbookings'
import Dashboard from './Pages/Admin/dashBoard'
const App = () => {
  const isAdminDashboard=useLocation().pathname.startsWith('/admin')
  return (
    <>
    {!isAdminDashboard && <Navbar/>}
    <Toaster/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/movies' element={<Movies/>}/>
       <Route path='/movies/:id' element={<MovieDetails/>}/>
       <Route path='/movies/:id/:date' element={<SeatLayoutPage/>}/>
       <Route path='/my-bookings' element={<MyBookings/>}/>
       <Route path='/favorites' element={<Favorite/>}/>
      <Route path='/admin/*' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
       <Route path='add-shows' element={<Addshows/>}/>
       <Route path='list-shows' element={<Listshows/>}/>
       <Route path='list-bookings' element={<Listbookings/>}/>


      </Route>

    </Routes>
    {!isAdminDashboard && <Footer/>}
      
    </>
  )
}

export default App
