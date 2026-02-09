import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
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
          to="/"
          onClick={() => {
            scrollTo(0, 0);
            setOpen(false);
          }}
        >
          Theaters
        </Link>
        <Link
          to="/"
          onClick={() => {
            scrollTo(0, 0);
            setOpen(false);
          }}
        >
          Releses
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
      <div className="flex items-center gap-8 ">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />

        <button
          onClick={() => {
            setOpen(true);
          }}
          className="px-4 py-1 sm:px-7 sm:py-2 bg-red-600 hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Login
        </button>
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
