import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-[2px] ${className}`}>
      {/* Icon portion - similar to QuickShow 'Q' layout */}
      <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-[3px] sm:border-[3.5px] border-[#F84565] mr-1">
        {/* Play triangle inside */}
        <div className="w-0 h-0 border-t-[4px] sm:border-t-[5px] border-t-transparent border-l-[6px] sm:border-l-[8px] border-l-[#F84565] border-b-[4px] sm:border-b-[5px] border-b-transparent ml-0.5 sm:ml-1"></div>
        {/* Accent dot on the ring */}
        <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#F84565] rounded-full"></div>
      </div>
      
      {/* Text portion */}
      <span className="text-white text-2xl sm:text-[28px] font-black tracking-tight" style={{ fontFamily: '"Outfit", sans-serif' }}>
        Movie<span className="text-[#F84565]">Pulse</span>
      </span>
    </div>
  );
};

export default Logo;
