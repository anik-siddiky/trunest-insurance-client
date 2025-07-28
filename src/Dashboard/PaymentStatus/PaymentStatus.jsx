import React from 'react';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';
import { useNavigate } from 'react-router';

const PaymentStatus = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const navigate = useNavigate();


    const { data: approvedApplications = [], isLoading } = useQuery({
        queryKey: ['approvedApplications', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`/application?email=${user.email}&status=approved`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 lg:p-6">
            <h2 className="text-2xl font-semibold mb-6">Payment Status</h2>

            <div className="overflow-x-auto border rounded-md dark:border-[#171717] hidden lg:block">
                <table className="w-full min-w-[900px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Policy</th>
                            <th className="px-4 py-3">Monthly Premium</th>
                            <th className="px-4 py-3">Yearly Premium</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-[#171717]">
                        {approvedApplications.map((app) => (
                            <tr key={app._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                <td className="px-4 py-3">{app.policyTitle}</td>
                                <td className="px-4 py-3">৳{app.quote.monthly}</td>
                                <td className="px-4 py-3">৳{app.quote.annual}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`capitalize px-2 py-1 rounded-full text-xs font-medium
      ${app.paymentStatus === 'paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}
                                    >
                                        {app.paymentStatus || 'due'}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {app.paymentStatus === 'due' ? (
                                        <button
                                            className="bg-primary text-white px-3 py-1 rounded cursor-pointer transition"
                                            onClick={() => navigate(`/payment/${app._id}`, { state: app })}
                                        >
                                            Pay
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-medium">Paid</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-4">
                {approvedApplications.map((app) => (
                    <div
                        key={app._id}
                        className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {app.policyTitle}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            <strong>Monthly Premium:</strong> ৳{app.quote.monthly}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            <strong>Yearly Premium:</strong> ৳{app.quote.annual}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 capitalize flex items-center gap-2">
                            <strong>Status:</strong>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${app.paymentStatus === 'paid'
                                        ? 'bg-green-200 text-green-800'
                                        : 'bg-yellow-200 text-yellow-800'
                                    }`}
                            >
                                {app.paymentStatus || 'due'}
                            </span>
                        </p>


                        <div className="flex justify-end mt-4">
                            {app.paymentStatus === 'due' ? (
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                                    onClick={() => navigate(`/payment/${app._id}`, { state: app })}>
                                    Pay
                                </button>
                            ) : (
                                <span className="text-green-600 font-medium text-sm">Paid</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentStatus;
