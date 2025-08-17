import React from 'react';
import CountUp from 'react-countup';
import { FaUsers, FaRegHandshake, FaAward, FaBriefcase, FaDollarSign, FaClock } from 'react-icons/fa';

const statsData = [
    { id: 1, icon: <FaUsers />, label: 'Happy Clients', value: 1500 },
    { id: 2, icon: <FaRegHandshake />, label: 'Partnerships', value: 320 },
    { id: 3, icon: <FaAward />, label: 'Awards Won', value: 45 },
    { id: 4, icon: <FaBriefcase />, label: 'Projects Completed', value: 780 },
    { id: 5, icon: <FaDollarSign />, label: 'Total Premium Collected', value: 1250000, isCurrency: true },
    { id: 6, icon: <FaClock />, label: 'Years of Trust', value: 25 },
];

const CompanyStats = () => {
    return (
        <section>
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {statsData.map(({ id, icon, label, value, isCurrency }) => (
                    <div
                        key={id}
                        className="flex flex-col items-center justify-center 
                                   bg-white dark:bg-[#171717] 
                                   shadow-md border border-gray-200 dark:border-gray-700 
                                   rounded-2xl p-4 text-center 
                                   transition-all duration-500 transform 
                                   hover:scale-105 hover:bg-gradient-to-r 
                                   hover:from-green-50 hover:to-green-100 
                                   dark:hover:from-green-900/30 dark:hover:to-black/30"
                    >
                        <div className="text-3xl text-green-500 mb-2">{icon}</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            <CountUp
                                end={value}
                                duration={2.5}
                                separator=","
                                prefix={isCurrency ? '৳' : ''}
                            />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CompanyStats;
