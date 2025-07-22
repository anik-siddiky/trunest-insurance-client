'use client';
import useAxios from '@/Hooks/useAxios';
import Loading from '@/components/Loading';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ManageApplication = () => {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Fetch all applications
    const { data: applications = [], isLoading: loadingApps } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axios.get('/application');
            return res.data;
        }
    });

    // Fetch agents
    const { data: agents = [], isLoading: loadingAgents } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const res = await axios.get('/users');
            return res.data.filter(user => user.role === 'agent');
        }
    });

    // Mutation to update application
    const updateApplication = useMutation({
        mutationFn: async ({ id, updates }) => {
            return axios.patch(`/application/${id}`, updates);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            toast.success('Application updated');
        },
        onError: () => toast.error('Something went wrong'),
    });

    const filteredApps = applications.filter(app =>
        (app.personal?.name || '').toLowerCase().includes(search.toLowerCase())
    );

    if (loadingApps || loadingAgents) return <Loading />;

    const handleAssignAgent = async (appId, agentEmail) => {
        await axios.patch(`/application/${appId}`, {
            assignedAgent: agentEmail,
        });
        queryClient.invalidateQueries({ queryKey: ['applications'] });
        toast.success("Assigned an agent successfully");
    };

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">Manage Applications</h2>
                <Input
                    type="text"
                    className="border rounded-md w-full md:w-72"
                    placeholder="Search applicants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={updateApplication.isLoading}
                />
            </div>

            {/* Desktop View */}
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
                        {filteredApps.map(app => (
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
                                        {app.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="px-4 py-2.5 flex gap-2 flex-wrap">
                                    <Select
                                        value={app.assignedAgent || ''}
                                        onValueChange={(val) => handleAssignAgent(app._id, val)}
                                        disabled={updateApplication.isLoading}
                                    >
                                        <SelectTrigger className="w-[120px] h-8">
                                            <SelectValue placeholder="Assign" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {agents.map(agent => (
                                                <SelectItem key={agent._id} value={agent.email}>
                                                    {agent.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        disabled={updateApplication.isLoading}
                                        onClick={() =>
                                            updateApplication.mutate({ id: app._id, updates: { status: "rejected" } })
                                        }
                                    >
                                        Reject
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="outline"
                                        disabled={updateApplication.isLoading}
                                        onClick={() => {
                                            setSelectedApplication(app);
                                            setDialogOpen(true);
                                        }}
                                    >
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden space-y-4">
                {filteredApps.map(app => (
                    <div key={app._id} className="border rounded-lg p-4 space-y-2 dark:border-neutral-700 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">{app.personal?.name || '-'}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${app.status === "Approved" ? "bg-green-200 text-green-800" :
                                app.status === "rejected" ? "bg-red-200 text-red-800" :
                                    "bg-yellow-200 text-yellow-800"
                                }`}>
                                {app.status || 'Pending'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{app.personal?.email || '-'}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Policy: {app.policyTitle || '-'}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Date: {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : '-'}</p>

                        <div className="flex gap-2 flex-wrap mt-2">
                            <Select
                                value={app.assignedAgent || ''}
                                onValueChange={(val) => handleAssignAgent(app._id, val)}
                                disabled={updateApplication.isLoading}
                            >
                                <SelectTrigger className="w-[120px] h-8">
                                    <SelectValue placeholder="Assign" />
                                </SelectTrigger>
                                <SelectContent>
                                    {agents.map(agent => (
                                        <SelectItem key={agent._id} value={agent.email}>
                                            {agent.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                size="sm"
                                variant="destructive"
                                className="w-full"
                                disabled={updateApplication.isLoading}
                                onClick={() =>
                                    updateApplication.mutate({ id: app._id, updates: { status: "rejected" } })
                                }
                            >
                                Reject
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                disabled={updateApplication.isLoading}
                                onClick={() => {
                                    setSelectedApplication(app);
                                    setDialogOpen(true);
                                }}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Single Dialog */}
            <Dialog
                open={dialogOpen}
                onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (!open) setSelectedApplication(null);
                }}
            >
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                    </DialogHeader>

                    {selectedApplication ? (
                        <div className="text-sm space-y-2 max-h-[60vh] overflow-y-auto">
                            <p><strong>Name:</strong> {selectedApplication.personal?.name || '-'}</p>
                            <p><strong>Email:</strong> {selectedApplication.personal?.email || '-'}</p>
                            <p><strong>Address:</strong> {selectedApplication.personal?.address || '-'}</p>
                            <p><strong>NID:</strong> {selectedApplication.personal?.nid || '-'}</p>
                            <p><strong>Policy:</strong> {selectedApplication.policyTitle || '-'}</p>
                            <p><strong>Coverage:</strong> ৳{Number(selectedApplication.quoteInput?.coverage || 0).toLocaleString()}</p>
                            <p><strong>Duration:</strong> {Number(selectedApplication.quoteInput?.duration || 0)} years</p>
                            <p><strong>Age:</strong> {Number(selectedApplication.quoteInput?.age || 0)} years</p>
                            <p><strong>Monthly Premium:</strong> ৳{selectedApplication.quote?.monthly || 0}</p>
                            <p><strong>Yearly Premium:</strong> ৳{selectedApplication.quote?.annual || 0}</p>
                            <p><strong>Nominee:</strong> {selectedApplication.nominee?.name ? `${selectedApplication.nominee.name} (${selectedApplication.nominee.relationship || '-'})` : '-'}</p>
                            <p><strong>Status:</strong> {selectedApplication.status || '-'}</p>

                            <div>
                                <strong>Health Conditions:</strong>
                                {selectedApplication.health && Object.entries(selectedApplication.health).some(([_, v]) => v) ? (
                                    <ul className="list-disc ml-5">
                                        {Object.entries(selectedApplication.health).filter(([_, v]) => v).map(([k]) => (
                                            <li key={k} className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No reported conditions</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Loading...</p>
                    )}

                    <DialogFooter>
                        <Button onClick={() => setDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageApplication;
