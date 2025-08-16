import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { ShieldCheck, Clock } from "lucide-react";

const TopSixInsuranceCard = ({ policy }) => {
    const { _id } = policy;

    return (
        <div className="group relative bg-gradient-to-b from-white to-gray-50 dark:from-[#1b1b1b] dark:to-[#111] rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#078338]/20 via-transparent to-[#078338]/10 pointer-events-none"></div>

            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                    src={policy.image}
                    alt={policy.policyTitle}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                <span className="absolute top-4 left-4 bg-[#078338] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase">
                    {policy.category}
                </span>
            </div>

            <div className="p-6 flex flex-col flex-grow relative z-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-[#078338] transition">
                    {policy.policyTitle}
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
                    {policy.description?.slice(0, 110) ?? 'No description available'}...
                </p>

                <div className="flex justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-[#078338]" />
                        <span className="text-sm text-gray-800 dark:text-gray-300">
                            {policy.coverageFrom} - {policy.coverageTo}৳
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-[#078338]" />
                        <span className="text-sm text-gray-800 dark:text-gray-300">
                            {policy.duration} yrs
                        </span>
                    </div>
                </div>

                <Link to={`/policy-details/${_id}`} className="mt-auto">
                    <Button className="w-full rounded-xl font-semibold py-3 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointer">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default TopSixInsuranceCard;
