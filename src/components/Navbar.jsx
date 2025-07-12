import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { X } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import ThemeChange from './ThemeChange';
import logo from '@/assets/Tru-Logo.png'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasBorder, setHasBorder] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (lastScrollY - currentScrollY > 5) {
                setShowNavbar(true);
            } else if (currentScrollY - lastScrollY > 5) {
                setShowNavbar(false);
            }

            if (currentScrollY > 80 && lastScrollY > currentScrollY) {
                setHasBorder(true);
            } else if (currentScrollY < 10) {
                setHasBorder(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/all-policies', label: 'All Policies' },
        { path: '/blogs', label: 'Blogs' },
        { path: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 backdrop-blur-md bg-white/50 dark:bg-black/50 shadow-sm ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                    } ${hasBorder ? 'border-b' : ''}`}
            >
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
                                    `relative transition duration-300 ${isActive ? 'text-primary font-semibold' : 'hover:text-chart-2'
                                    }`}>
                                {label}
                                {location.pathname === path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 h-[3px] w-full bg-primary rounded-full"
                                        transition={{ type: 'spring', stiffness: 500, damping: 50 }} />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="hidden lg:flex gap-3 items-center">
                        <ThemeChange></ThemeChange>
                        <Link to="/contact">
                            <button className="bg-primary text-white px-4 py-2 rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                                Sign in
                            </button>
                        </Link>
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
                        className="fixed inset-0 z-[999] bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center p-6 lg:hidden">
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="absolute top-6 right-6">
                            <X size={30} />
                        </button>

                        <button className="absolute top-6 left-6 p-1">
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"></svg>
                        </button>

                        {/* Mobile Nav Items */}
                        <ul className="flex flex-col gap-6 text-2xl">
                            {navItems.map(({ path, label }) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        onClick={() => setDrawerOpen(false)}
                                        className={({ isActive }) =>
                                            `transition duration-300 ${isActive ? 'text-[#A87914] font-semibold' : 'hover:text-[#A87914]'}`
                                        }
                                    >
                                        {label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
};

export default Navbar;
