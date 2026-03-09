import React from 'react'
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/5 bg-black/40 backdrop-blur-lg">
        <div className="px-6 md:px-16 lg:px-36 py-16">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 md:gap-20">
                
                {/* Brand & Description */}
                <div className="md:max-w-96 space-y-6">
                    <div className="opacity-90 inline-block mb-2"><Logo /></div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Experience movies like never before. Book tickets, watch trailers, and explore the cinematic universe with premium comfort.
                    </p>
                    <div className="flex items-center gap-3">
                        <img 
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" 
                            alt="Get it on Google Play" 
                            className="h-10 w-auto border border-white/10 rounded-lg hover:border-white/30 transition-colors cursor-pointer bg-white/5" 
                        />
                        <img 
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" 
                            alt="Download on the App Store" 
                            className="h-10 w-auto border border-white/10 rounded-lg hover:border-white/30 transition-colors cursor-pointer bg-white/5" 
                        />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex items-start md:justify-end gap-16 md:gap-32">
                    <div>
                        <h2 className="font-semibold text-white mb-6">Company</h2>
                        <ul className="text-sm space-y-4 text-gray-400">
                            <li><Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link to="/movies" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Movies</Link></li>
                            <li><Link to="/my-bookings" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">My Bookings</Link></li>
                            <li><Link to="/favorites" onClick={() => window.scrollTo(0, 0)} className="hover:text-primary transition-colors">Favorites</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-white mb-6">Support</h2>
                        <ul className="text-sm space-y-4 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li>
                                <span className="block text-white/50 text-xs mb-1">Contact Us</span>
                                <span className="hover:text-primary transition-colors">+1-234-567-890</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
                <p>
                    Copyright {new Date().getFullYear()} © <span className="text-gray-300">Moviepulse</span>. All Rights Reserved.
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
