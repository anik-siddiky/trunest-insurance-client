import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { X } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ThemeChange from './ThemeChange';
import logo from '@/assets/Tru-Logo.png'
import useAuth from '@/Hooks/useAuth';
import { Button } from './ui/button';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const dropDownRef = useRef(null);

    const handleLogOut = () => {
        logOut()
            .then(() => {
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setIsDropDownOpen(false);
            };
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (lastScrollY - currentScrollY > 5) {
                setShowNavbar(true);
            } else if (currentScrollY - lastScrollY > 5) {
                setShowNavbar(false);
            }


            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/all-policies', label: 'All Policies' },
        { path: '/blogs', label: 'Blogs' },
        { path: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-0 py-2">
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

                    {/* Logo */}
                    <Link to="/" className="text-3xl flex">
                        <img className='w-8 md:w-10 lg:w-12' src={logo} alt="" />
                        <p className='font-bold lg:mt-2 mt-2 lg:-ml-5 -ml-3.5 text-2xl md:text-3xl lg:text-4xl'>ruNest</p>
                    </Link>

                    {/* Desktop Nav Items */}
                    <div className="hidden lg:flex items-center gap-6 text-[17px]">
                        {navItems.map(({ path, label }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `relative transition duration-300 ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'
                                    }`}>
                                {label}
                                {location.pathname === path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-2 left-0 h-[5px] w-full bg-primary"
                                        transition={{ type: 'spring', stiffness: 400, damping: 50 }} />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden lg:flex gap-3 items-center">
                        <ThemeChange></ThemeChange>
                        {
                            user ?

                                <div ref={dropDownRef} className="relative">
                                    {/* Avatar Button */}
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

                                    {/* Dropdown */}
                                    {isDropDownOpen && (
                                        <ul
                                            className="absolute top-full mt-3 right-0 lg:left-1/2 lg:-translate-x-1/2 z-[999] w-56 shadow-xl rounded-xl p-4 space-y-3 transition-all bg-white dark:bg-zinc-900">
                                            <li className="text-center text-sm font-medium">
                                                Hi, {user?.displayName || "User"}
                                            </li>

                                            <div className='flex justify-center items-center'><Button
                                                onClick={() => { handleLogOut(); setIsDropDownOpen(false); }}
                                                className="w-2/3 text-white">
                                                Log Out
                                            </Button></div>
                                        </ul>
                                    )}
                                </div>
                                :
                                <>
                                    <Link to="/signin">
                                        <button className="bg-primary text-white px-4 py-2 rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                            Sign In
                                        </button>
                                    </Link>
                                </>
                        }
                        <button className="p-1 lg:hidden">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            </svg>
                        </button>
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

                        <button className="absolute top-6 left-6 p-1">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"></svg>
                        </button>

                        {/* Mobile Nav Items */}
                        <ul className="flex flex-col gap-2 text-xl text-center">
                            {navItems.map(({ path, label }) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        onClick={() => setDrawerOpen(false)}
                                        className={({ isActive }) =>
                                            `transition duration-300 ${isActive ? 'text-primary font-semibold' : ''}`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                            {
                                user ?
                                    <>
                                        <button onClick={handleLogOut} className="bg-primary text-white px-4 py-1.5 text-[18px] rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                            Sign Out
                                        </button>
                                    </>
                                    :
                                    <>
                                        <Link to="/signin">
                                            <button className="bg-primary text-white px-4 py-1.5 text-[18px] rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                                Sign In
                                            </button>
                                        </Link>
                                    </>
                            }
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default Navbar;
