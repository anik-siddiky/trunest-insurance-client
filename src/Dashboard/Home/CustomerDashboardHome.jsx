import React from 'react';
import { NavLink } from 'react-router';
import { FiFileText, FiCreditCard } from 'react-icons/fi';
import { RiMoneyDollarCircleLine, RiFileShieldLine } from 'react-icons/ri';
import useAuth from '@/Hooks/useAuth';

const CustomerDashboardHome = () => {
    const { user } = useAuth();

    // Greeting based on time
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
                            <h1 className="text-2xl font-bold">
                                {getGreeting()}, {user?.displayName || 'Customer'}!
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg shadow-sm p-6 bg-white dark:bg-[#171717]">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <NavLink
                            to="/dashboard/my-policies"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <FiFileText className="text-xl mb-1" />
                            <span>My Policies</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/payment-status"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <FiCreditCard className="text-xl mb-1" />
                            <span>Payment Status</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/payment-history"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <RiMoneyDollarCircleLine className="text-xl mb-1" />
                            <span>Payment History</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/claim-policy"
                            className="flex flex-col items-center justify-center p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                        >
                            <RiFileShieldLine className="text-xl mb-1" />
                            <span>Claim Policy</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardHome;
