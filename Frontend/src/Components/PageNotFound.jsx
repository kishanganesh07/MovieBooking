import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-dark-bg text-center relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl"
      >
        <motion.h1 
          className="text-8xl md:text-9xl font-black text-white mb-6 tracking-tighter"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          404
        </motion.h1>
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Lost Your Way?
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed">
          We are sorry, the page you requested could not be found. Please go back to the homepage.
        </p>

        <button
          onClick={() => {navigate("/"), scrollTo(0, 0)}}
          className="group relative flex items-center gap-2 mx-auto px-8 py-4 bg-primary hover:bg-primary-dull text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
        >
          <Home className="w-5 h-5 group-hover:animate-bounce" />
          <span>Go Back Home</span>
        </button>
      </motion.div>

      {/* Aesthetic Numbers Overlay */}
      <div className="absolute bottom-10 left-10 text-[10vw] font-black text-white/[0.02] select-none pointer-events-none">
        ERROR
      </div>
      <div className="absolute top-10 right-10 text-[10vw] font-black text-white/[0.02] select-none pointer-events-none">
        MOVIE
      </div>
    </div>
  );
};

export default PageNotFound;
