import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import MovieDetails from "./Pages/MovieDetails";
import SeatLayoutPage from "./Pages/SeatLayoutPage";
import MyBookings from "./Pages/MyBookings";
import Favorite from "./Pages/Favorite";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
import Layout from "./Pages/Admin/Layout";
import Addshows from "./Pages/Admin/Addshows";
import Listshows from "./Pages/Admin/Listshows";
import Listbookings from "./Pages/Admin/Listbookings";
import Dashboard from "./Pages/Admin/Dashboard";
import SelectShow from "./Pages/SelectShow";
import AdminRoute from "./Components/AdminRoute";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ListUsers from "./Pages/Admin/usersList";
import PageNotFound from "./Components/PageNotFound";
import ProtectedRoute from "./Components/ProtectedRoute";




const App = () => {
  const isAdminDashboard = useLocation().pathname.startsWith("/admin");
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const showLayout = !isAdminDashboard && !isLogin && !isRegister;
  return (
    <>
      {showLayout && <Navbar />}
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/seats/:movieId" element={<SeatLayoutPage />} />
          <Route path="/select-show/:movieId" element={<SelectShow />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/favorites" element={<Favorite />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Layout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<Addshows />} />
          <Route path="list-shows" element={<Listshows />} />
          <Route path="list-bookings" element={<Listbookings />} />
          <Route path="list-users" element={<ListUsers />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
};

export default App;
