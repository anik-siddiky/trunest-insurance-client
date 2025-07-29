import React from 'react';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axios = useAxios();

    const { data: userPayments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/payments?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Payment History
            </h2>

            <div className="hidden lg:block overflow-x-auto rounded-md border dark:border-[#171717]">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Policy Title</th>
                            <th className="px-4 py-3">Transaction ID</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-[#171717]">
                        {userPayments.length > 0 ? (
                            userPayments.map(payment => (
                                <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                    <td className="px-4 py-3">{payment.policyTitle}</td>
                                    <td className="px-4 py-3">{payment.transactionId}</td>
                                    <td className="px-4 py-3">৳{payment.amount}</td>
                                    <td className="px-4 py-3"><span className='bg-green-200 py-1 px-2 rounded-sm'>Paid</span></td>
                                    <td className="px-4 py-3">{new Date(payment.paidAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">
                                    No payments found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="lg:hidden space-y-4">
                {userPayments.length > 0 ? (
                    userPayments.map(payment => (
                        <div key={payment._id} className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{payment.policyTitle}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Transaction ID:</strong> {payment.transactionId}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Amount:</strong> ৳{payment.amount}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Status:</strong><span className='ml-2 bg-green-200 py-1 px-2 rounded-sm'>Paid</span></p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Date:</strong> {new Date(payment.paidAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No payments found.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
