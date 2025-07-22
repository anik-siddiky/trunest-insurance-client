'use client';
import React, { useState } from 'react';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import Loading from '@/components/Loading';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const MyPolicies = () => {
    const { user } = useAuth();
    const axios = useAxios();
    const queryClient = useQueryClient();
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { data: myApplications = [], isLoading } = useQuery({
        queryKey: ['myPolicies', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get('/application');
            return res.data.filter(app => app.personal?.email === user.email);
        },
    });

    const { mutate: submitReview, isLoading: isSubmitting } = useMutation({
        mutationFn: async (reviewData) => {
            const res = await axios.post('/reviews', reviewData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Review submitted!');
            setShowModal(false);
            setRating(0);
            setFeedback('');
            queryClient.invalidateQueries(['myPolicies', user?.email]);
        },
        onError: () => toast.error('Failed to submit review.')
    });

    const handleReviewSubmit = () => {
        if (!rating || !feedback.trim()) return toast.error('Please provide rating and feedback.');
        submitReview({
            email: user.email,
            name: user.displayName,
            policyTitle: selectedPolicy.policyTitle,
            rating,
            feedback
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4 lg:p-6 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">My Policies</h2>

            {myApplications.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">No policies found.</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto border rounded-lg">
                        <table className="w-full min-w-[900px] text-sm text-left">
                            <thead className="bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-100">
                                <tr>
                                    <th className="px-4 py-3">Policy</th>
                                    <th className="px-4 py-3">Coverage</th>
                                    <th className="px-4 py-3">Duration</th>
                                    <th className="px-4 py-3">Premium</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y dark:divide-neutral-700">
                                {myApplications.map(app => (
                                    <tr key={app._id}>
                                        <td className="px-4 py-3">{app.policyTitle}</td>
                                        <td className="px-4 py-3">৳{app.quoteInput.coverage}</td>
                                        <td className="px-4 py-3">{app.quoteInput.duration} years</td>
                                        <td className="px-4 py-3">৳{app.quote.monthly}/mo</td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${app.status === 'approved' ? 'bg-green-200 text-green-800' :
                                                app.status === 'rejected' ? 'bg-red-200 text-red-800' :
                                                    'bg-yellow-200 text-yellow-800'
                                                }`}>{app.status}</span>
                                        </td>
                                        <td className="px-4 py-3 flex space-x-2">
                                            <button
                                                onClick={() => setSelectedPolicy(app)}
                                                className="px-2 py-1 rounded-sm border border-blue-600 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                                            >
                                                View Details
                                            </button>
                                            {app.status === 'approved' && (
                                                <button
                                                    onClick={() => { setSelectedPolicy(app); setShowModal(true); }}
                                                    className="px-2 py-1 rounded-sm border border-amber-500 bg-amber-50 text-amber-600 text-sm font-medium hover:bg-amber-600 hover:text-white transition"
                                                >
                                                    Give Review
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="block md:hidden space-y-4">
                        {myApplications.map(app => (
                            <div key={app._id} className="border rounded-lg p-4 dark:border-neutral-700">
                                <h3 className="font-semibold text-lg mb-1">{app.policyTitle}</h3>
                                <p><strong>Coverage:</strong> ৳{app.quoteInput.coverage}</p>
                                <p><strong>Duration:</strong> {app.quoteInput.duration} years</p>
                                <p><strong>Premium:</strong> ৳{app.quote.monthly}/mo</p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${app.status === 'approved' ? 'bg-green-200 text-green-800' :
                                        app.status === 'rejected' ? 'bg-red-200 text-red-800' :
                                            'bg-yellow-200 text-yellow-800'
                                        }`}>{app.status}</span>
                                </p>
                                <div className="mt-2 flex space-x-4">
                                    <Button
                                        onClick={() => setSelectedPolicy(app)}
                                        className="px-3 py-1.5 rounded-sm border border-blue-600 bg-blue-50 text-blue-600 text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                                    >
                                        View Details
                                    </Button>
                                    {app.status === 'approved' && (
                                        <Button
                                            onClick={() => { setSelectedPolicy(app); setShowModal(true); }}
                                            className="px-3 py-1.5 rounded-sm border border-amber-500 bg-amber-50 text-amber-600 text-sm font-medium hover:bg-amber-600 hover:text-white transition"
                                        >
                                            Give Review
                                        </Button>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* Review Modal */}
                    {showModal && selectedPolicy && (
                        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
                            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg max-w-md w-full relative">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-2 right-3 text-xl"
                                >×</button>
                                <h3 className="text-xl font-semibold mb-4">Review: {selectedPolicy.policyTitle}</h3>
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">Rating</label>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                            >★</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Feedback</label>
                                    <textarea
                                        rows="4"
                                        className="w-full border rounded p-2 dark:bg-neutral-800 dark:border-neutral-700"
                                        value={feedback}
                                        onChange={e => setFeedback(e.target.value)}
                                    ></textarea>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    onClick={handleReviewSubmit}
                                    className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
                                >Submit Review</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyPolicies;
