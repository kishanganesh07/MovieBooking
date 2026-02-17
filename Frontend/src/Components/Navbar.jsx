import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useEffect } from "react";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [user,setUser]=useState(null)
  const navigate=useNavigate()
  useEffect(()=>{
     const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/profile", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        }else {
        setUser(null);
      }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  },[])
  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
      </Link>
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 z-50
  flex flex-col md:flex-row items-center max-md:justify-center gap-8
  md:px-8 py-3 max-md:h-screen md:rounded-full
  backdrop-blur-2xl bg-black/70 md:bg-white/10 md:border border-gray-300/20
  transition-all duration-300 ease-in-out
  ${isOpen ? "max-md:w-full max-md:opacity-100" : "max-md:w-0 max-md:opacity-0 max-md:pointer-events-none"}
  md:w-auto md:opacity-100`}
      >
        <XIcon
          className="md:hidden absolute top-6 left-6 w-6 h-6 cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        />
        <Link
          to="/"
          onClick={() => {
            scrollTo(0, 0);
            setOpen(false);
          }}
        >
          Home
        </Link>
        <Link
          to="/movies"
          onClick={() => {
            scrollTo(0, 0);
            setOpen(false);
          }}
        >
          Movies
        </Link>
        <Link
          to="/my-bookings"
          onClick={() => {
            scrollTo(0, 0);
            setOpen(false);
          }}
        >
          My Bookings
        </Link>
        <Link
          to="/favorites"
          onClick={() => {
            scrollTo(0, 0);
            setOpen(false);
          }}
        >
          Favorites
        </Link>
      </div>
            <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer text-white" />
        {user && user.name ? (
          <div className="relative group">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white font-bold cursor-pointer">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div
              className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg 
              opacity-0 invisible translate-y-2 
              group-hover:opacity-100 group-hover:visible 
              group-hover:translate-y-0 transition-all duration-200"
            >
              <button
                onClick={() => navigate("/my-bookings")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer "
              >
                My Bookings
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-red-600 hover:bg-red-700 transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => {
          setOpen(!isOpen);
        }}
      />
    </div>
  );
};

export default Navbar;
