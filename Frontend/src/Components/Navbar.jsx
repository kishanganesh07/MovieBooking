import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { BackendUrl } from "../config";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* ===== SCROLL EFFECT ===== */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== FETCH USER ===== */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BackendUrl}/api/auth/profile`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  /* ===== LOGOUT ===== */
  const handleLogout = async () => {
    await fetch(`${BackendUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-6 pointer-events-none"
      >
        <div
          className={`
            pointer-events-auto
            flex items-center justify-between 
            px-6 py-3 sm:px-8 sm:py-3
            w-[90%] max-w-7xl 
            rounded-full 
            transition-all duration-500 ease-out
            ${
              isScrolled || isOpen
                ? "glass-panel bg-black/70 border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                : "bg-transparent border-transparent"
            }
          `}
        >
          {/* ===== LOGO ===== */}
          <Link to="/">
            <img src={assets.logo} alt="Logo" className="w-36 h-auto" />
          </Link>

          {/* ===== DESKTOP LINKS (Separate) ===== */}
          <div className="hidden md:flex items-center gap-6">

            {/* Home */}
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className={`relative px-4 py-2 rounded-full font-medium transition
                ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {isActive("/") && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              )}
              <span className="relative z-10">Home</span>
            </Link>

            {/* Movies */}
            <Link
              to="/movies"
              onClick={() => scrollTo(0, 0)}
              className={`relative px-4 py-2 rounded-full font-medium transition
                ${isActive("/movies") ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {isActive("/movies") && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              )}
              <span className="relative z-10">Movies</span>
            </Link>

            {/* My Bookings */}
            <Link
              to="/my-bookings"
              onClick={() => scrollTo(0, 0)}
              className={`relative px-4 py-2 rounded-full font-medium transition
                ${isActive("/my-bookings") ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {isActive("/my-bookings") && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              )}
              <span className="relative z-10">My Bookings</span>
            </Link>

            {/* Favorites */}
            <Link
              to="/favorites"
              onClick={() => scrollTo(0, 0)}
              className={`relative px-4 py-2 rounded-full font-medium transition
                ${isActive("/favorites") ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              {isActive("/favorites") && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              )}
              <span className="relative z-10">Favorites</span>
            </Link>

          </div>

          {/* ===== RIGHT SIDE ===== */}
          <div className="flex items-center gap-8">
           

            {/* USER */}
                   {user && user.name ? (
              <div className="relative group">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dull text-white font-bold cursor-pointer shadow-lg shadow-primary/20 border border-white/10 overflow-hidden">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                
                {/* Dropdown */}
                <div
                  className="absolute right-0 mt-4 w-48 glass-panel rounded-2xl overflow-hidden
                  opacity-0 invisible translate-y-4 scale-95
                  group-hover:opacity-100 group-hover:visible 
                  group-hover:translate-y-0 group-hover:scale-100 
                  transition-all duration-300 origin-top-right ring-1 ring-black/10"
                >
                  <div className="px-4 py-3 border-b border-white/5 bg-black/5">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Signed in as</p>
                    <p className="font-bold text-white truncate">{user.name}</p>
                  </div>
                  
                  <div className="p-1.5 flex flex-col gap-1 cusor-pointer">
                    <button onClick={() => navigate("/my-bookings")} className="cusor-pointer w-full text-left px-3 py-2 text-sm rounded-xl text-gray-300 hover:text-white hover:bg-black transition-colors">
                        My Bookings
                    </button>
                    <button onClick={handleLogout} className="cusor-pointer w-full text-left px-3 py-2 text-sm rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                        Logout
                    </button>
                  </div>
                </div>
              </div>
            )  : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full font-medium text-white"
              >
                Login
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <MenuIcon
            className="md:hidden w-8 h-8 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-[300px] bg-black p-6 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <XIcon
                className="mb-8 w-6 h-6 cursor-pointer"
                onClick={() => setOpen(false)}
              />

              <div className="flex flex-col gap-6 text-lg font-bold">

                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/movies" onClick={() => setOpen(false)}>Movies</Link>
                <Link to="/my-bookings" onClick={() => setOpen(false)}>My Bookings</Link>
                <Link to="/favorites" onClick={() => setOpen(false)}>Favorites</Link>

                {/* Mobile Auth Button */}
                <div className="mt-4 pt-6 border-t border-white/10">
                  {user ? (
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dull text-white font-bold border border-white/10">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white">{user.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                        className="w-full py-3 bg-red-500/10 text-red-500 rounded-xl font-medium border border-white/5 hover:bg-red-500 transition-colors hover:text-white"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setOpen(false);
                      }}
                      className="w-full py-3 bg-red-600 text-white rounded-xl font-medium"
                    >
                      Login
                    </button>
                  )}
                </div>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
