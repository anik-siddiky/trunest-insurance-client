import { useLocation, useParams } from 'react-router';

const Payment = () => {
    const { id } = useParams();
    const location = useLocation();
    const application = location.state;

    if (!application) {
        return (
            <div className="flex items-center justify-center min-h-screen p-6">
                <p className="text-red-600 text-lg font-medium">No data found. Please go back and try again.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <h2 className="text-3xl font-semibold mb-6 text-primary">
                Payment for <span className="underline">{application.policyTitle}</span>
            </h2>

            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md p-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">Monthly Premium:</span>
                    <span className="text-primary font-semibold text-lg">৳{application.quote.monthly}</span>
                </div>

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

                {/* Placeholder for future payment button or logic */}
                <button
                    disabled={application.paymentStatus === 'Paid'}
                    className={`mt-6 w-full py-3 rounded-md text-white font-semibold ${application.paymentStatus === 'Paid' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
                        } transition`}
                >
                    {application.paymentStatus === 'Paid' ? 'Payment Completed' : 'Proceed to Pay'}
                </button>
            </div>
        </div>
    );
};

export default Payment;
