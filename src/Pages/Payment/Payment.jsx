import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';
import PaymentForm from './PaymentForm';

const Payment = () => {
    const location = useLocation();
    const application = location.state;
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_key)

    if (!application) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6">
                <p className="text-red-600 text-lg font-medium">No data found. Please go back and try again.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-0 min-h-screen py-8 lg:py-20">
            <h2 className="text-3xl font-semibold mb-6 text-primary text-center">
                Payment for <span className="underline">{application.policyTitle}</span>
            </h2>

            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 space-y-4">

                <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">Yearly Premium:</span>
                    <span className="text-primary font-semibold text-lg">৳{application.quote.annual}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">Payment Status:</span>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${application.paymentStatus === 'Paid'
                            ? 'bg-primary text-white'
                            : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300'
                            }`}
                    >
                        {application.paymentStatus}
                    </span>
                </div>
                <Elements stripe={stripePromise}>
                    <PaymentForm></PaymentForm>
                </Elements>
            </div>


        </div>
    );
};

export default Payment;
