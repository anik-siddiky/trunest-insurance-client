import useAxios from '@/Hooks/useAxios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiUsers, FiFileText, FiCreditCard, FiTrendingUp, FiPieChart } from 'react-icons/fi';
import { MdPolicy, MdOutlineReviews, MdOutlineAssignmentTurnedIn } from 'react-icons/md';
import { RiFileList3Line, RiShieldCheckLine, } from 'react-icons/ri';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import Loading from '@/components/Loading';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, icon: Icon, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="bg-white dark:bg-[#1f1f1f] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary group">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800 dark:text-white">
                    {value}
                </h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-primary group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <Icon size={20} />
            </div>
        </div>
    </motion.div>
);



const AdminDashboardHome = () => {
    const axios = useAxios();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axios.get('/admin/stats');
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen p-6 bg-gray-50 dark:bg-[#121212]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Welcome back! Here's what's happening with your platform.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Users", value: stats.totalUsers, icon: FiUsers },
                        { title: "Total Policies", value: stats.totalPolicies, icon: MdPolicy },
                        { title: "Total Blogs", value: stats.totalBlogs, icon: BsFillJournalBookmarkFill },
                        { title: "Total Revenue", value: `৳${stats.totalRevenue}`, icon: FiTrendingUp },
                    ].map((stat, index) => (
                        <StatCard key={stat.title} index={index} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-5 h-full border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-800 dark:text-white">Quick Stats</h3>
                                <FiPieChart className="text-gray-400" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { title: "Applications", value: stats.totalApplications, icon: RiFileList3Line },
                                    { title: "Approved Apps", value: stats.approvedApplications, icon: MdOutlineAssignmentTurnedIn },
                                    { title: "Total Claims", value: stats.totalClaims, icon: FiFileText },
                                    { title: "Approved Claims", value: stats.approvedClaims, icon: RiShieldCheckLine },
                                ].map((item) => (
                                    <div key={item.title} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                        <div className="flex items-center">
                                            <div className="p-2 mr-3 rounded-md bg-blue-50 dark:bg-blue-900/20 text-primary">
                                                <item.icon size={16} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.title}</span>
                                        </div>
                                        <span className="text-sm font-semibold">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {[
                        { title: "Total Reviews", value: stats.totalReviews, icon: MdOutlineReviews },
                        { title: "Payments Processed", value: stats.totalPayments, icon: FiCreditCard },
                    ].map((stat, index) => (
                        <StatCard key={stat.title} index={index + 4} {...stat} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;