import React from 'react';
import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import TopSixInsuranceCard from './TopSixInsuranceCard';
import Loading from '@/components/Loading';

const TopSixInsurance = () => {
    const axios = useAxios();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['top-six-insurance'],
        queryFn: async () => {
            const res = await axios.get('/policies/top-purchased');
            return res.data;
        }
    });

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-center text-red-500 py-10">Failed to load top policies.</div>;

    return (
        <div className="">
            <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Top Purchased Insurance Plans
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                    These plans are popular among our customers. Explore and find out why they’re trusted the most.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.map(policy => (
                    <TopSixInsuranceCard key={policy._id} policy={policy} />
                ))}
            </div>
        </div>
    );
};

export default TopSixInsurance;
