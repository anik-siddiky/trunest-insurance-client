'use client';
import useAxios from '@/Hooks/useAxios';
import Loading from '@/components/Loading';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, XCircle } from 'lucide-react';
import { FaTrash } from 'react-icons/fa';

const ManageApplication = () => {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const [search, setSearch] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [applicationToDelete, setApplicationToDelete] = useState(null);

    const { data: applications = [], isLoading: loadingApps } = useQuery({
        queryKey: ['applications'],
        queryFn: async () => {
            const res = await axios.get('/application');
            return res.data;
        }
    });

    const { data: agents = [], isLoading: loadingAgents } = useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const res = await axios.get('/users');
            return res.data.filter(user => user.role === 'agent');
        }
    });

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

    const deleteApplication = useMutation({
        mutationFn: async (id) => {
            return axios.delete(`/application/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            toast.success('Application deleted successfully');
            setDeleteConfirmOpen(false);
            setApplicationToDelete(null);
        },
        onError: () => toast.error('Failed to delete application'),
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

    const openDeleteConfirm = (app) => {
        setApplicationToDelete(app);
        setDeleteConfirmOpen(true);
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
                    disabled={updateApplication.isLoading || deleteApplication.isLoading}
                />
            </div>

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
                                        disabled={updateApplication.isLoading || deleteApplication.isLoading}>
                                        <SelectTrigger className="w-[120px] h-5">
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

                                    <button className='inline-flex cursor-pointer items-center gap-1 rounded bg-black dark:bg-white bg-opacity-90 px-2 py-0.5 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95' size="sm" variant="destructive" disabled={updateApplication.isLoading || deleteApplication.isLoading} onClick={() => updateApplication.mutate({ id: app._id, updates: { status: "rejected" } })}>
                                        <XCircle className="w-4 h-4" /> Reject
                                    </button>

                                    <button className='inline-flex cursor-pointer items-center gap-1 rounded bg-black dark:bg-white bg-opacity-90 px-2 py-1 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95'
                                        size="sm" variant="outline" disabled={updateApplication.isLoading || deleteApplication.isLoading}
                                        onClick={() => { setSelectedApplication(app); setDialogOpen(true); }}>
                                        <Eye className="w-4 h-4" /> View
                                    </button>

                                    <button className='inline-flex cursor-pointer items-center gap-1 rounded bg-black dark:bg-white bg-opacity-90 px-2 py-1 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95'
                                        size="sm" variant="destructive" disabled={updateApplication.isLoading || deleteApplication.isLoading} onClick={() => openDeleteConfirm(app)}>
                                        <FaTrash className="w-3 h-3" /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="block md:hidden space-y-4">
                {filteredApps.map(app => (
                    <div key={app._id} className="border rounded-lg p-4 space-y-2 dark:border-neutral-700 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">{app.personal?.name || '-'}</h3>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${app.status === "approved" ? "bg-green-200 text-green-800" :
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
                                disabled={updateApplication.isLoading || deleteApplication.isLoading}>
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

                            <div className='flex gap-2'>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="bg-black dark:bg-white text-white dark:text-black"
                                    disabled={updateApplication.isLoading || deleteApplication.isLoading}
                                    onClick={() => updateApplication.mutate({ id: app._id, updates: { status: "rejected" } })}>
                                    <XCircle className="w-4 h-4" /> Reject
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    className=""
                                    disabled={updateApplication.isLoading || deleteApplication.isLoading}
                                    onClick={() => { setSelectedApplication(app); setDialogOpen(true); }}>
                                    <Eye className="w-4 h-4" /> View
                                </Button>

                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="bg-black dark:bg-white text-white dark:text-black"
                                    disabled={updateApplication.isLoading || deleteApplication.isLoading}
                                    onClick={() => openDeleteConfirm(app)}>
                                    <FaTrash className="w-2 h-2" /> Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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

            <Dialog
                open={deleteConfirmOpen}
                onOpenChange={(open) => {
                    setDeleteConfirmOpen(open);
                    if (!open) setApplicationToDelete(null);
                }}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Delete</DialogTitle>
                    </DialogHeader>
                    <p className="my-4 text-sm">
                        Are you sure you want to delete the application from <strong>{applicationToDelete?.personal?.name || 'this user'}</strong>? This action cannot be undone.
                    </p>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => setDeleteConfirmOpen(false)}
                            disabled={deleteApplication.isLoading}>
                            Cancel
                        </Button>
                        <Button
                            className="cursor-pointer"
                            variant="destructive"
                            onClick={() => deleteApplication.mutate(applicationToDelete._id)}
                            disabled={deleteApplication.isLoading}>
                            {deleteApplication.isLoading ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageApplication;
