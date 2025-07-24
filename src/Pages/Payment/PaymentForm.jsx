import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import useAuth from '@/Hooks/useAuth';
import useAxios from '@/Hooks/useAxios';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { id } = useParams();
    const axios = useAxios();
    const { user } = useAuth();

    const { data: applicationInfo = {}, isPending } = useQuery({
        queryKey: ['application', id],
        queryFn: async () => {
            const res = await axios.get(`/application/${id}`);
            return res.data;
        }
    })

    if (isPending) {
        return <Loading></Loading>
    }

    const amount = applicationInfo.quote.annual;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('payment method', paymentMethod);
        }

        const res = await axios.post('/create-payment-intent', {
            amountInCents,
            id
        });

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName,
                    email: user?.email
                },
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                const paymentRecord = {
                    applicationId: id,
                    amount,
                    transactionId: result.paymentIntent.id,
                    policyTitle: applicationInfo.policyTitle,
                    userEmail: user.email,
                };

                await axios.post('/confirm-payment', paymentRecord);
            }

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
                    disabled={!stripe}
                    className="w-full bg-primary text-white hover:bg-primary/90 cursor-pointer">
                    Pay ৳{amount}
                </Button>

                {
                    error && <p className='text-red-500 text-center'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;
