import Loading from '@/components/Loading';
import useAxios from '@/Hooks/useAxios';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Input } from "../../components/ui/input";
import AddPolicyModal from './AddPolicyModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import UpdatePolicyModal from './UpdatePolicyModal';

const ManagePolicies = () => {
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [policyToDelete, setPolicyToDelete] = useState(null);
    const [selectedPolicyToEdit, setSelectedPolicyToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const axios = useAxios();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ['all-policies'],
        queryFn: async () => {
            const res = await axios.get('/all-policies');
            return res.data;
        }
    });
    const policies = data || [];

    const handlePolicyAdded = () => {
        queryClient.invalidateQueries({ queryKey: ['all-policies'] });
        setIsAddModalOpen(false);
    }

    const deletePolicy = async (id) => {
        const res = await axios.delete(`/policies/${id}`);
        return res.data;
    };

    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: deletePolicy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['all-policies'] });
            setPolicyToDelete(null);
            toast('Policy deleted successfully!');
        },
        onError: (error) => {
            toast(`Failed to delete policy: ${error.message || 'Unknown error'}`);
        }
    })

    const handlePolicyUpdated = () => {
        queryClient.invalidateQueries({ queryKey: ['all-policies'] });
        setIsEditModalOpen(false);
    };

    const filteredPolicies = policies.filter(policy =>
        (policy.policyTitle || '').toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <AddPolicyModal open={isAddModalOpen} setOpen={setIsAddModalOpen} onPolicyAdded={handlePolicyAdded} />
            <UpdatePolicyModal open={isEditModalOpen} setOpen={setIsEditModalOpen} policy={selectedPolicyToEdit} onPolicyUpdated={handlePolicyUpdated} />
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">Manage Policies</h2>
                <div className='flex items-center gap-3'>
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-white px-4 py-1.5 rounded-sm transition transform active:scale-95 shadow-sm cursor-pointer">
                        <span className='lg:block hidden'>Add a Policy</span> <span className='lg:hidden'>Add</span>
                    </button>
                    <Input
                        type="text"
                        className="border rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Search policies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <div className="hidden lg:block overflow-x-auto rounded-md border dark:border-[#171717]">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Age Range</th>
                            <th className="px-4 py-3">Coverage</th>
                            <th className="px-4 py-3">Premium</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-[#171717]">
                        {filteredPolicies.length > 0 ? (
                            filteredPolicies.map(policy => (
                                <tr key={policy._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                    <td className="px-4 py-3">{policy.policyTitle}</td>
                                    <td className="px-4 py-3">{policy.category}</td>
                                    <td className="px-4 py-3">{policy.minAge} - {policy.maxAge}</td>
                                    <td className="px-4 py-3">৳{policy.coverageFrom} - ৳{policy.coverageTo}</td>
                                    <td className="px-4 py-3">{policy.basePremiumRate}৳</td>
                                    <td className="px-4 py-2.5 flex gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedPolicyToEdit(policy);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
                                            aria-label={`Edit ${policy.policyTitle}`}>
                                            <FaEdit />
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => setPolicyToDelete(policy)}
                                            className="inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
                                            aria-label={`Delete ${policy.policyTitle}`}>
                                            <FaTrash />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    No policies found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-4">
                {filteredPolicies.length > 0 ? (
                    filteredPolicies.map(policy => (
                        <div key={policy._id} className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{policy.policyTitle}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Category:</strong> {policy.category}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Age Range:</strong> {policy.minAge} - {policy.maxAge}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Coverage:</strong> {policy.coverageRange}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Premium:</strong> {policy.basePremiumRate}</p>
                            <div className="flex gap-4 mt-3">
                                <button
                                    onClick={() => {
                                        setSelectedPolicyToEdit(policy);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
                                    aria-label={`Edit ${policy.policyTitle}`}>
                                    <FaEdit />
                                    Edit
                                </button>
                                <button
                                    onClick={() => setPolicyToDelete(policy)}
                                    className="inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md transition-transform hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
                                    aria-label={`Delete ${policy.policyTitle}`}>
                                    <FaTrash />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No policies found.</p>
                )}
            </div>


            <AlertDialog open={!!policyToDelete} onOpenChange={(open) => !open && setPolicyToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the policy "{policyToDelete?.policyTitle}".
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="text-white"
                            disabled={isDeleting}
                            onClick={() => handleDelete(policyToDelete._id)}>
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>



        </div>
    );

};

export default ManagePolicies;
