import useAuth from '@/Hooks/useAuth';
import React from 'react';
import { NavLink } from 'react-router';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { FiUsers } from 'react-icons/fi';
import { MdGavel } from 'react-icons/md';

const AgentDashboardHome = () => {
    const { user } = useAuth();

    // Get current time for greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto">
                
                <div className="bg-white dark:bg-[#171717] rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        {user?.photoURL && (
                            <img 
                                src={user.photoURL} 
                                alt="Profile" 
                                className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                            />
                        )}
                        <div>
                            <h1 className="text-2xl font-bold ">
                                {getGreeting()}, {user?.displayName || 'Agent'}!
                            </h1>
                            <p className="t">{user?.email}</p>
                        </div>
                    </div>
                </div>

                
                <div className="rounded-lg shadow-sm p-6 bg-white dark:bg-[#171717]">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <NavLink 
                            to="/dashboard/manage-blogs"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <HiOutlineNewspaper className="text-xl mb-1" />
                            <span>Manage Blogs</span>
                        </NavLink>

                        
                        <NavLink 
                            to="/dashboard/assigned-customers"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <FiUsers className="text-xl mb-1" />
                            <span>Customers</span>
                        </NavLink>

                        
                        <NavLink 
                            to="/dashboard/policy-clearance"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <MdGavel className="text-xl mb-1" />
                            <span>Policy Clearance</span>
                        </NavLink>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDashboardHome;