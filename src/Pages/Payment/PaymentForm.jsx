import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const axios = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: applicationInfo = {}, isPending } = useQuery({
        queryKey: ['application', id],
        queryFn: async () => {
            const res = await axios.get(`/application/${id}`);
            return res.data;
        }
    });

    if (isPending) {
        return <Loading />;
    }

    const amount = applicationInfo.quote.annual;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setLoading(false);
            return;
        }

        const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (cardError) {
            setError(cardError.message);
            setLoading(false);
            return;
        } else {
            setError('');
            console.log('Payment method:', paymentMethod);
        }

        try {
            const res = await axios.post('/create-payment-intent', {
                amountInCents,
                id
            });

            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });

            if (result.error) {
                console.error(result.error.message);
                setError(result.error.message);
                setLoading(false);
                return;
            }

            if (result.paymentIntent.status === 'succeeded') {
                const paymentRecord = {
                    applicationId: id,
                    amount,
                    transactionId: result.paymentIntent.id,
                    policyTitle: applicationInfo.policyTitle,
                    userEmail: user.email,
                };

                await axios.post('/confirm-payment', paymentRecord);

                card.clear();
                navigate('/dashboard/payment-status/')
                toast.success('Payment successful!');
            }

        } catch (err) {
            console.error('Payment failed:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md border dark:border-neutral-800">
            <h2 className="text-xl font-semibold text-primary mb-4">Payment Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 border rounded bg-gray-50 dark:bg-neutral-800">
                    <CardElement className="text-base" />
                </div>
                <Button
                    type="submit"
                    disabled={!stripe || loading}
                    className="flex items-center justify-center gap-2 w-full rounded-xl cursor-pointer py-3 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointe ">
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                />
                            </svg>
                            Processing...
                        </>
                    ) : (
                        <>Pay ৳{amount}</>
                    )}
                </Button>

                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
