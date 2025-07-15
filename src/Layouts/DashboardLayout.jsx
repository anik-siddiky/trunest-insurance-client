import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router';
import { FiMenu, FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { HiOutlineDocumentText } from "react-icons/hi";
import useAuth from '@/Hooks/useAuth';
import logo from '../assets/Tru-Logo.png'
import ThemeChange from '@/components/ThemeChange';
import { IoCloseSharp } from "react-icons/io5";;

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user } = useAuth();
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#171717]">
            {/* Sidebar */}
            <aside
                className={`fixed z-40 lg:static top-0 left-0 h-full w-80 transform transition-transform duration-300 flex flex-col bg-[#FAFAFA] dark:bg-[#171717] lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-700">

                    <Link to="/" className="text-3xl flex">
                        <img className='w-6 md:w-8 lg:w-10' src={logo} alt="" />
                        <p className='font-bold lg:mt-2 mt-2 lg:-ml-5 -ml-3.5 text-xl lg:text-2xl'>ruNest</p>
                    </Link>
                    <div className='flex'>
                        <ThemeChange></ThemeChange>
                        <button className="lg:hidden" onClick={closeSidebar}>
                            <IoCloseSharp size={35} />
                        </button>
                    </div>
                </div>


                <nav className="flex flex-col flex-1 p-4 gap-2">

                    <div className="flex flex-col gap-1 flex-grow">

                        <NavLink to="/dashboard/home" onClick={closeSidebar}
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 rounded-xl transition ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <FiHome /> <span className='lg:mt-0.5'>Home</span>
                        </NavLink>

                        <NavLink to="/dashboard/manage-policies" onClick={closeSidebar}
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 rounded-xl transition ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <HiOutlineDocumentText /><span className='lg:mt-0.5'>Manage Policies</span>
                        </NavLink>

                        <NavLink to="/dashboard/fdsa" onClick={closeSidebar}
                            className={({ isActive }) => `flex items-center gap-2 py-2 px-4 rounded-xl transition ${isActive ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                            <FiSettings /> Settings
                        </NavLink>

                        <button
                            className="flex items-center gap-2 py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                            onClick={() => alert('Logging out...')}>
                            <FiLogOut /> Logout
                        </button>
                    </div>


                    <div className="mt-auto hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl p-2 flex items-center gap-3">
                        <img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL} alt="User" />
                        <div className="text-sm">
                            <p className="font-medium">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                </nav>
            </aside>



            <div className="flex-1 flex flex-col">
                <header className="lg:hidden flex items-center justify-between shadow px-4 py-3">
                    <button onClick={toggleSidebar}>
                        <FiMenu size={24} />
                    </button>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <div />
                </header>

                <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-[#FAFAFA] dark:bg-[#171717]">
                    <div className='bg-white dark:bg-[#09090B] rounded-2xl border'>
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;
