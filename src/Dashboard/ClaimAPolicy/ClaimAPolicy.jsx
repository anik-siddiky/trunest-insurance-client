import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import React from 'react';

const ClaimAPolicy = () => {
    const { user } = useAuth();
    const axios = useAxios();

    const { data: claimablePolicies = [], isLoading } = useQuery({
        queryKey: ['claimablePolicies', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/claimable-policies?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Claim Eligible Policies</h2>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-md border dark:border-[#171717]">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Coverage</th>
                            <th className="px-4 py-3">Duration</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-[#171717]">
                        {claimablePolicies.map(policy => (
                            <tr key={policy._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                <td className="px-4 py-3">{policy.policyTitle}</td>
                                <td className="px-4 py-3">৳{policy.quoteInput.coverage}</td>
                                <td className="px-4 py-3">{policy.quoteInput.duration} months</td>
                                <td className="px-4 py-3"><span className='py-1 px-2 bg-green-300 rounded-sm'>{policy.policyStatus}</span></td>
                                <td className="px-4 py-3">
                                    <button className="inline-flex items-center gap-2 rounded bg-primary text-white px-3 py-1 text-xs shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer">
                                        Claim
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {claimablePolicies.map(policy => (
                    <div key={policy._id} className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{policy.policyTitle}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Coverage:</strong> ৳{policy.quote.coverage}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Duration:</strong> {policy.quoteInput.duration} months</p>
                        <div className="mt-3">
                            <button className="inline-flex items-center gap-2 rounded bg-primary text-white px-3 py-1 text-sm shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer">
                                Claim
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* No Policies Fallback */}
            {claimablePolicies.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-8">
                    No eligible policies found.
                </p>
            )}
        </div>
    );
};

export default ClaimAPolicy;
