import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import React, { useState } from 'react';
import ClaimPolicyModal from './ClaimPolicyModal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ClaimAPolicy = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [claimedPolicyMap, setClaimedPolicyMap] = useState({});

    const { data: claimablePolicies = [], isLoading, refetch } = useQuery({
        queryKey: ['claimablePolicies', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/claimable-policies?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    useQuery({
        queryKey: ['userClaims', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/claims?email=${user?.email}`);
            const map = {};
            res.data.forEach(claim => {
                map[claim.policyId] = claim.claimStatus;
            });
            setClaimedPolicyMap(map);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleClaimClick = (policy) => {
        setSelectedPolicy(policy);
    };

    const handleApprovedClick = (policy) => {
        toast.success(`Your claim for "${policy.policyTitle}" is approved!`);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Claim Eligible Policies</h2>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-md border dark:border-[#171717]">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Coverage</th>
                            <th className="px-4 py-3">Duration</th>
                            <th className="px-4 py-3">Policy Status</th>
                            <th className="px-4 py-3">Claim Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-[#171717]">
                        {claimablePolicies.map(policy => {
                            const claimStatus = claimedPolicyMap[policy.policyId];
                            return (
                                <tr key={policy._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                    <td className="px-4 py-3">{policy.policyTitle}</td>
                                    <td className="px-4 py-3">৳{policy.quoteInput.coverage.toLocaleString()}</td>
                                    <td className="px-4 py-3">{policy.quoteInput.duration} Years</td>
                                    <td className="px-4 py-3">
                                        <span className="py-1 px-2 bg-green-300 rounded-sm text-sm">{policy.policyStatus}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {claimStatus ? (
                                            claimStatus === 'approved' ? (
                                                <Button size="sm" onClick={() => handleApprovedClick(policy)}>Approved</Button>
                                            ) : (
                                                <span className="bg-yellow-100 rounded-sm py-1 px-2 text-sm">Pending</span>
                                            )
                                        ) : (
                                            <span className="text-gray-500 text-sm">Not Claimed</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Button
                                            size="sm"
                                            className="cursor-pointer"
                                            onClick={() => handleClaimClick(policy)}
                                            disabled={!!claimStatus}
                                        >
                                            Claim
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {claimablePolicies.map(policy => {
                    const claimStatus = claimedPolicyMap[policy.policyId];
                    return (
                        <div key={policy._id} className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{policy.policyTitle}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Coverage:</strong> ৳{policy.quoteInput.coverage}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Duration:</strong> {policy.quoteInput.duration} Years</p>
                            <p className="text-sm mt-2"><strong>Policy Status:</strong> {policy.policyStatus}</p>
                            <p className="text-sm"><strong>Claim Status:</strong> {
                                claimStatus
                                    ? claimStatus === 'approved'
                                        ? <Button size="sm" className="mt-1" onClick={() => handleApprovedClick(policy)}>Approved</Button>
                                        : <span className="text-yellow-600">Pending</span>
                                    : 'Not Claimed'
                            }</p>
                            <div className="mt-3">
                                <Button
                                    size="sm"
                                    onClick={() => handleClaimClick(policy)}
                                    disabled={!!claimStatus}
                                >
                                    Claim
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* No Policies Fallback */}
            {claimablePolicies.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center mt-8">
                    No eligible policies found.
                </p>
            )}

            {/* Claim Modal */}
            {selectedPolicy && (
                <ClaimPolicyModal
                    policy={selectedPolicy}
                    onClose={() => {
                        setSelectedPolicy(null);
                        refetch();
                    }}
                />
            )}
        </div>
    );
};

export default ClaimAPolicy;
