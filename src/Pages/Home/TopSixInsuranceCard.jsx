import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const TopSixInsuranceCard = ({ policy }) => {
    const { _id } = policy;

    return (
        <div className="bg-white dark:bg-[#171717] shadow-md rounded-lg overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-xl duration-500">
            <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                    src={policy.image}
                    alt={policy.policyTitle}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-1 truncate text-black dark:text-white">
                    {policy.policyTitle}
                </h2>
                <p className="text-sm mb-2 capitalize text-gray-600 dark:text-gray-400">
                    Category: {policy.category}
                </p>
                <p className="text-sm mb-2 text-gray-800 dark:text-gray-300">
                    {policy.description?.slice(0, 100) ?? 'No description available'}...
                </p>

                <ul className="text-sm space-y-1 mb-4 mt-auto text-gray-700 dark:text-gray-400">
                    <li><strong>Coverage:</strong> {policy.coverageRange}</li>
                    <li><strong>Duration:</strong> {policy.duration} years</li>
                </ul>

                <Link to={`/policy-details/${_id}`}>
                    <Button className="w-full text-white cursor-pointer">View Details</Button>
                </Link>
            </div>
        </div>
    );
};

export default TopSixInsuranceCard;
