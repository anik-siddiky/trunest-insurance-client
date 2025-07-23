import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAxios from '@/Hooks/useAxios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import useAuth from '@/Hooks/useAuth';

const ApplyForPolicy = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const axios = useAxios();

    const quote = location.state?.quote;
    const formInput = location.state?.form;
    const policyTitle = location.state?.policyTitle;

    const {
        register,
        handleSubmit,
        // eslint-disable-next-line no-unused-vars
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            address: '',
            nid: '',
            nomineeName: '',
            nomineeRelation: '',
            health: {
                diabetes: false,
                heartDisease: false,
                cancer: false,
                other: false,
            },
        },
    });

    useEffect(() => {
        if (user?.email) {
            setValue('email', user.email);
        }
    }, [user?.email, setValue]);

    const onSubmit = async (data) => {
        if (!quote) {
            toast('Quote not found. Please go back and calculate first.');
            return;
        }

        const applicationData = {
            policyId: id,
            policyTitle,
            quote,
            quoteInput: {
                age: Number(formInput.age),
                coverage: Number(formInput.coverage),
                duration: Number(formInput.duration),
            },
            personal: {
                name: data.name,
                email: user?.email,
                address: data.address,
                nid: data.nid,
            },
            nominee: {
                name: data.nomineeName,
                relationship: data.nomineeRelation,
            },
            health: data.health,
            status: 'pending',
            appliedAt: new Date(),
        };


        try {
            await axios.post('/application', applicationData);
            toast('Application submitted!');
            navigate('/dashboard/my-policies');
        } catch (err) {
            console.error('Submission Error:', err);
            toast('Failed to submit application. Try again.');
        }
    };


    const healthFields = ['diabetes', 'heartDisease', 'cancer', 'other'];

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 my-5 lg:mb-16">
            <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 lg:mb-6">
                Apply for: {policyTitle}
            </h1>

            {quote ? (
                <div className="bg-gray-100 dark:bg-[#1f1f1f] p-5 rounded-lg text-lg space-y-1 text-center shadow">
                    <p>
                        <strong>Monthly Premium:</strong> ৳{quote.monthly}
                    </p>
                    <p>
                        <strong>Annual Premium:</strong> ৳{quote.annual}
                    </p>
                </div>
            ) : (
                <p className="text-red-500 text-center">No quote found. Please return to quote page.</p>
            )}

            {/* Personal Info */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow space-y-4">
                <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
                <Input placeholder="Full Name" {...register('name', { required: true })} />
                <Input
                    type="email"
                    placeholder="Email Address"
                    {...register('email', { required: true })}
                    readOnly
                    className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                />

                <Input placeholder="Full Address" {...register('address', { required: true })} />
                <Input placeholder="NID Number" {...register('nid', { required: true })} />
            </div>

            {/* Nominee Info */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow space-y-4">
                <h2 className="text-xl font-semibold mb-2">Nominee Information</h2>
                <Input placeholder="Nominee's Name" {...register('nomineeName', { required: true })} />
                <Input placeholder="Relationship to You" {...register('nomineeRelation', { required: true })} />
            </div>

            {/* Health Disclosure */}
            <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow space-y-4">
                <h2 className="text-xl font-semibold mb-2">Health Disclosure</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {healthFields.map((field) => (
                        <label key={field} className="flex items-center space-x-2">
                            <Checkbox
                                checked={watch(`health.${field}`)}
                                onCheckedChange={(checked) => setValue(`health.${field}`, checked)}
                            />
                            <span className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center">
                <Button
                    onClick={handleSubmit(onSubmit)}
                    className="cursor-pointer active:scale-105 text-white px-6 py-2 rounded-full shadow transition"
                >
                    Submit Application
                </Button>
            </div>
        </div>
    );
};

export default ApplyForPolicy;
