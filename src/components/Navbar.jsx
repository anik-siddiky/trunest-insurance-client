/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { X, Clock, Calendar, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeChange from './ThemeChange';
import logo from '@/assets/Tru-Logo.png';
import useAuth from '@/Hooks/useAuth';
import { Button } from './ui/button';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dropDownRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(new Date());

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = e => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setIsDropDownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (lastScrollY - currentScrollY > 5) setShowNavbar(true);
            else if (currentScrollY - lastScrollY > 5) setShowNavbar(false);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/all-policies', label: 'Policies' },
        ...(user ? [{ path: '/dashboard', label: 'Dashboard' }] : []),
        { path: '/blogs', label: 'Blogs' },
        { path: '/about', label: 'About' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>

                <div className="hidden w-full bg-[#0e441d] text-white text-sm md:text-base lg:flex justify-between items-center px-6 py-0.5 shadow-md">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 mb-0.5" />
                            <span className=''>{currentTime.toLocaleTimeString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4 mb-0.5" />
                            <span>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                            <Mail className="w-4 h-4" />
                            <span className='italic font-sans'>contact@trunestinsurance.com</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:underline cursor-pointer">
                            <Phone className="w-4 h-4" />
                            <span className='italic font-sans'>+17 729 226 9522</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-0 py-1">
                    <button
                        onClick={() => setDrawerOpen(true)}
                        className="lg:hidden p-2 rounded-md">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <Link to="/" className="text-3xl flex">
                        <img className='w-8 md:w-10 lg:w-12' src={logo} alt="" />
                        <p className='font-bold lg:mt-2 mt-2 lg:-ml-5 -ml-3.5 text-2xl md:text-3xl lg:text-4xl'>ruNest</p>
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 text-[17px]">
                        {navItems.map(({ path, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `transition-all duration-500 transform rounded-xl font-medium cursor-pointer text-lg ${isActive
                                        ? 'animate-float px-4 py-1.5 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] shadow-[#078338]/30 text-white active:scale-95'
                                        : 'dark:text-gray-100 hover:bg-gradient-to-r hover:text-primary'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>


                    <div className="hidden lg:flex gap-3 items-center">
                        <ThemeChange />
                        {user ? (
                            <div ref={dropDownRef} className="relative">
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => setIsDropDownOpen(prev => !prev)}
                                    className="cursor-pointer w-14 h-14 rounded-full overflow-hidden border-2 border-primary transition-shadow hover:shadow-md focus:outline-none"
                                >
                                    <img
                                        src={user?.photoURL}
                                        alt="User Avatar"
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>

                                {isDropDownOpen && (
                                    <ul className="absolute top-full mt-3 right-0 lg:left-1/2 lg:-translate-x-1/2 z-[999] w-56 shadow-xl rounded-xl p-4 space-y-3 transition-all bg-white dark:bg-zinc-900">
                                        <li className="text-center text-sm font-medium">
                                            Hi, {user?.displayName || "User"}
                                        </li>

                                        <li className='flex justify-center hover:bg-gray-100 rounded-sm '>
                                            <Link to="/update-profile" onClick={() => setIsDropDownOpen(false)}>
                                                <button className='p-2 cursor-pointer'>Manage Profile</button>
                                            </Link>
                                        </li>

                                        <div className='flex justify-center items-center'>
                                            <Button
                                                onClick={() => { handleLogOut(); setIsDropDownOpen(false); }}
                                                className="w-2/3 text-white">
                                                Log Out
                                            </Button>
                                        </div>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <Link to="/signin">
                                <button className="bg-primary text-white px-4 py-2 rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {drawerOpen && (
                    <motion.div
                        key="mobile-drawer"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[999] bg-opacity-90 bg-white dark:bg-black backdrop-blur-sm flex flex-col items-center justify-center p-6 lg:hidden">
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="absolute top-6 right-6">
                            <X size={30} />
                        </button>

                        <ul className="flex flex-col gap-2 text-xl text-center">
                            {navItems.map(({ path, label }) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        onClick={() => setDrawerOpen(false)}
                                        className={({ isActive }) =>
                                            `transition duration-300 ${isActive ? 'text-primary font-semibold' : ''}`} >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <NavLink
                                    to="/update-profile"
                                    onClick={() => setDrawerOpen(false)}
                                    className={({ isActive }) =>
                                        `transition duration-300 ${isActive ? 'text-primary font-semibold' : ''}`} >
                                    Update Profile
                                </NavLink>
                            </li>
                            {user ? (
                                <button onClick={handleLogOut} className="bg-primary text-white px-4 py-1.5 text-[18px] rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                    Sign Out
                                </button>
                            ) : (
                                <Link to="/signin">
                                    <button className="bg-primary text-white px-4 py-1.5 text-[18px] rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                        Sign In
                                    </button>
                                </Link>
                            )}
                            <li className='flex justify-center'><ThemeChange /></li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
