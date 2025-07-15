import Loading from '@/components/Loading';
import useAxios from '@/Hooks/useAxios';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Input } from "../components/ui/input";
import AddPolicyModal from '../components/AddPolicyModal';

const ManagePolicies = () => {
    const [loading, setLoading] = useState(true);
    const [policies, setPolicies] = useState([]);
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const axios = useAxios();

    useEffect(() => {
        axios.get('/policies')
            .then(res => {
                setPolicies(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error Fetching Policies", error);
                setLoading(false);
            });
    }, [axios]);

    const filteredPolicies = policies.filter(policy =>
        (policy.policyTitle || '').toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <AddPolicyModal open={isAddModalOpen} setOpen={setIsAddModalOpen} />
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
                                    <td className="px-4 py-3">{policy.coverageRange}</td>
                                    <td className="px-4 py-3">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            maximumFractionDigits: 0,
                                        }).format(policy.basePremiumRate)}
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button className="text-blue-600 hover:underline flex items-center gap-1">
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="text-red-600 hover:underline flex items-center gap-1">
                                            <FaTrash /> Delete
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

            {/* Card layout for mobile and tablet */}
            <div className="lg:hidden space-y-4">
                {filteredPolicies.length > 0 ? (
                    filteredPolicies.map(policy => (
                        <div key={policy._id} className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{policy.policyTitle}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Category:</strong> {policy.category}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Age Range:</strong> {policy.minAge} - {policy.maxAge}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Coverage:</strong> {policy.coverageRange}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Premium:</strong> {
                                    new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        maximumFractionDigits: 0,
                                    }).format(policy.basePremiumRate)
                                }
                            </p>
                            <div className="flex gap-4 mt-3">
                                <button className="text-blue-600 hover:underline flex items-center gap-1">
                                    <FaEdit /> Edit
                                </button>
                                <button className="text-red-600 hover:underline flex items-center gap-1">
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No policies found.</p>
                )}
            </div>
        </div>
    );
};

export default ManagePolicies;
