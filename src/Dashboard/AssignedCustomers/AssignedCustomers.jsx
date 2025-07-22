'use client';
import React, { useState } from 'react';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import Loading from '@/components/Loading';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const AssignedCustomers = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const queryClient = useQueryClient();
    const [selectedApp, setSelectedApp] = useState(null);

    const { data: assignedApps = [], isLoading } = useQuery({
        queryKey: ['assignedCustomers', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get('/application');
            return res.data.filter(app => app.assignedAgent === user?.email);
        }
    });

const { mutate: approveApplication, isLoading: isApproving } = useMutation({
    mutationFn: async ({ appId, policyId }) => {
        await axios.patch(`/application/${appId}`, { status: 'approved' });

        if (policyId) {
            await axios.patch(`/policies/${policyId}/increase`);
        }
    },
    onSuccess: () => {
        toast.success('Application approved successfully');
        queryClient.invalidateQueries({ queryKey: ['assignedCustomers', user?.email] });
    },
    onError: () => toast.error('Failed to approve application'),
});



    const { mutate: rejectApplication, isLoading: isRejecting } = useMutation({
        mutationFn: async (id) => axios.patch(`/application/${id}`, { status: 'rejected' }),
        onSuccess: () => {
            toast.success('Application rejected successfully');
            queryClient.invalidateQueries({ queryKey: ['assignedCustomers', user?.email] });
        },
        onError: () => toast.error('Failed to reject application')
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Assigned Customers
            </h2>

            {assignedApps.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                    No customers have been assigned to you yet.
                </p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto rounded-md border dark:border-[#171717]">
                        <table className="w-full min-w-[900px] text-left text-sm">
                            <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3">Policy</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-[#171717]">
                                {assignedApps.map(app => (
                                    <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                        <td className="px-4 py-3">{app.personal?.name || '-'}</td>
                                        <td className="px-4 py-3">{app.personal?.email || '-'}</td>
                                        <td className="px-4 py-3">{app.policyTitle || '-'}</td>
                                        <td className="px-4 py-3">{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '-'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${app.status === "approved" ? "bg-green-200 text-green-800" :
                                                    app.status === "rejected" ? "bg-red-200 text-red-800" :
                                                        "bg-yellow-200 text-yellow-800"
                                                }`}>
                                                {app.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 flex gap-2 flex-wrap">
                                            {app.status !== 'approved' && app.status !== 'rejected' && (
                                                <>
                                                    <button
                                                        onClick={() => approveApplication({ appId: app._id, policyId: app.policyId })}
                                                        disabled={isApproving}
                                                        className="bg-green-600 text-white px-2 py-1 rounded-sm text-sm disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => rejectApplication(app._id)}
                                                        disabled={isRejecting}
                                                        className="bg-red-600 text-white px-2 py-1 rounded-sm text-sm disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => setSelectedApp(app)}
                                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-sm text-sm dark:bg-[#2a2a2a] dark:text-white"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="block md:hidden space-y-4">
                        {assignedApps.map(app => (
                            <div key={app._id} className="border rounded-lg p-4 dark:border-neutral-700 shadow-sm">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-medium">{app.personal?.name || '-'}</h3>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${app.status === "approved" ? "bg-green-200 text-green-800" :
                                            app.status === "rejected" ? "bg-red-200 text-red-800" :
                                                "bg-yellow-200 text-yellow-800"
                                        }`}>
                                        {app.status || 'pending'}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Email: {app.personal?.email || '-'}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">Policy: {app.policyTitle || '-'}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Date: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '-'}
                                </p>
                                <div className="flex gap-4 mt-2">
                                    {app.status !== 'approved' && app.status !== 'rejected' && (
                                        <>
                                            <button
                                                onClick={() => approveApplication(app._id)}
                                                disabled={isApproving}
                                                className="text-green-700 hover:underline text-sm disabled:opacity-50"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => rejectApplication(app._id)}
                                                disabled={isRejecting}
                                                className="text-red-600 hover:underline text-sm disabled:opacity-50"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => setSelectedApp(app)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal */}
                    {selectedApp && (
                        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg max-w-md w-full p-6 relative">
                                <button
                                    className="absolute top-2 right-3 text-lg font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                                    onClick={() => setSelectedApp(null)}
                                >
                                    ×
                                </button>
                                <h3 className="text-xl font-semibold mb-4">Customer Details</h3>
                                <p><strong>Name:</strong> {selectedApp.personal?.name}</p>
                                <p><strong>Email:</strong> {selectedApp.personal?.email}</p>
                                <p><strong>Interested Policy:</strong> {selectedApp.policyTitle}</p>
                                <p><strong>Status:</strong> {selectedApp.status}</p>
                                <p><strong>Date Applied:</strong> {new Date(selectedApp.appliedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AssignedCustomers;
