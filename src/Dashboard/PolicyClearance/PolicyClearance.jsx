import React, { useState } from 'react';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const PolicyClearance = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const queryClient = useQueryClient();

    const [selectedClaim, setSelectedClaim] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Confirmation modal states
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // 'approve' or 'reject'
    const [confirmClaim, setConfirmClaim] = useState(null);

    const { data: claims = [], isLoading } = useQuery({
        queryKey: ['agentClaims', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/claims/agent/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleStatusChange = async (id, status) => {
        try {
            await axios.patch(`/claims/${id}`, { claimStatus: status });
            queryClient.invalidateQueries(['agentClaims', user?.email]);
            setIsConfirmModalOpen(false);
            setConfirmClaim(null);
            setConfirmAction(null);
        } catch (err) {
            console.error(err);
        }
    };

    // Open confirmation modal before status change
    const openConfirmModal = (claim, action) => {
        setConfirmClaim(claim);
        setConfirmAction(action);
        setIsConfirmModalOpen(true);
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 min-h-screen">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white mb-6">
                Policy Clearance
            </h2>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto rounded-md border dark:border-gray-700">
                <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Policy Title</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Coverage</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-gray-800">
                        {claims.map((claim) => (
                            <tr key={claim._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                <td className="px-4 py-3">{claim.policyTitle}</td>
                                <td className="px-4 py-3">{claim.customerName}</td>
                                <td className="px-4 py-3">{claim.email}</td>
                                <td className="px-4 py-3">{claim.coverage}</td>
                                <td className="px-4 py-3 capitalize">{claim.claimStatus}</td>
                                <td className="px-4 py-3 flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setSelectedClaim(claim);
                                            setIsViewModalOpen(true);
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() => openConfirmModal(claim, 'approve')}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => openConfirmModal(claim, 'reject')}
                                    >
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {claims.map((claim) => (
                    <div key={claim._id} className="p-4 border rounded-md dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{claim.policyTitle}</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Email:</strong> {claim.email}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Status:</strong> {claim.claimStatus}
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Button
                                size="sm"
                                onClick={() => {
                                    setSelectedClaim(claim);
                                    setIsViewModalOpen(true);
                                }}>
                                View
                            </Button>
                            <Button
                                size="sm"
                                variant="success"
                                onClick={() => openConfirmModal(claim, 'approve')}>
                                Approve
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => openConfirmModal(claim, 'reject')}>
                                Reject
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Claim Reason Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Claim Reason</DialogTitle>
                        <DialogDescription>
                            View the reason submitted for this claim.
                        </DialogDescription>
                    </DialogHeader>
                    <p className="text-sm text-gray-800 dark:text-gray-200 mt-2">
                        {selectedClaim?.reason || 'No reason provided.'}
                    </p>
                    <p>
                        <a
                            href={selectedClaim?.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            View Document
                        </a>
                    </p>
                    <DialogFooter>
                        <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Confirm Approve/Reject Modal */}
            <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {confirmAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {confirmAction} the claim for <strong>{confirmClaim?.policyTitle}</strong>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant={confirmAction === 'approve' ? 'success' : 'destructive'}
                            onClick={() => handleStatusChange(confirmClaim._id, confirmAction === 'approve' ? 'approved' : 'rejected')}
                        >
                            {confirmAction === 'approve' ? 'Approve' : 'Reject'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PolicyClearance;
