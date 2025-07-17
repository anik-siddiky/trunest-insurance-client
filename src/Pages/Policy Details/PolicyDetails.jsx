import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '@/Hooks/useAxios';
import { Button } from '../../components/ui/button';
import Loading from '@/components/Loading';

const PolicyDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const navigate = useNavigate();

    const { data: policy, isLoading, isError } = useQuery({
        queryKey: ['policy', id],
        queryFn: async () => {
            const res = await axios.get(`/policy/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <Loading></Loading>
        );
    }

    if (isError || !policy) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-semibold text-red-600">Policy Not Found</h2>
                <p className="text-gray-500">The policy you are looking for doesn't exist or failed to load.</p>
            </div>
        );
    }

    const {
        policyTitle,
        description,
        category,
        minAge,
        maxAge,
        coverageRange,
        durationOptions,
        basePremiumRate,
        image,
        eligibility,
        benefits,
    } = policy;

    return (
        <div className="max-w-7xl mx-auto lg:px-0 px-4 py-10">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-lg mb-10">
                <img
                    src={image}
                    alt={policyTitle}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center text-center px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        {policyTitle}
                    </h1>
                </div>
            </div>

            <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    <span className="uppercase font-semibold text-primary">Category:</span>{' '}
                    <span className="uppercase">{category}</span>
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300">{description}</p>

                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Age Eligibility:</strong> {minAge} - {maxAge} years</li>
                    <li><strong>Coverage Range:</strong> {coverageRange}</li>
                    <li><strong>Duration Options:</strong> {durationOptions?.join(', ')}</li>
                    <li><strong>Base Premium Rate:</strong> ${basePremiumRate} per unit</li>
                </ul>

                {eligibility && (
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Eligibility Criteria</h3>
                        <p className="text-gray-600 dark:text-gray-400">{eligibility}</p>
                    </div>
                )}

                {benefits && (
                    <div>
                        <h3 className="font-semibold text-lg mb-1">Benefits</h3>
                        <p className="text-gray-600 dark:text-gray-400">{benefits}</p>
                    </div>
                )}

                <Button
                    onClick={() => navigate(`/quote/${id}`)}
                    className="mt-6 w-full sm:w-auto"
                >
                    Get a Quote
                </Button>
            </div>
        </div>
    );
};

export default PolicyDetails;
