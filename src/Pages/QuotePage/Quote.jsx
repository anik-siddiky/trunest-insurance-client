import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '@/Hooks/useAxios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { toast } from 'sonner';

const Quote = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axios = useAxios();

    const [form, setForm] = useState({
        age: '',
        gender: 'male',
        coverage: '',
        duration: '',
        smoker: 'no',
    });

    const [quote, setQuote] = useState(null);

    const { data: policy, isLoading, isError } = useQuery({
        queryKey: ['policy', id],
        queryFn: async () => {
            const res = await axios.get(`/policy/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuote = () => {
        if (!policy) return;

        const age = parseInt(form.age);
        const coverage = parseInt(form.coverage);
        const duration = parseInt(form.duration);

        if (isNaN(age) || age < policy.minAge || age > policy.maxAge) {
            toast(`Age must be between ${policy.minAge} and ${policy.maxAge}`);
            return;
        }

        if (isNaN(coverage) || coverage < policy.coverageFrom || coverage > policy.coverageTo) {
            toast(`Coverage must be between ৳${policy.coverageFrom.toLocaleString()} and ৳${policy.coverageTo.toLocaleString()}`);
            return;
        }

        if (isNaN(duration) || duration < 1 || duration > policy.duration) {
            toast(`Duration must be between 1 and ${policy.duration} years`);
            return;
        }

        let premium = policy.basePremiumRate;

        if (age <= 30) premium *= 1;
        else if (age <= 45) premium *= 1.2;
        else if (age <= 60) premium *= 1.5;
        else premium *= 1.8;

        if (form.smoker === 'yes') premium *= 1.4;

        if (form.gender === 'female') premium *= 0.9;

        premium *= coverage / policy.coverageFrom;
        premium *= duration / policy.duration;

        const annual = Math.round(premium);
        const monthly = Math.round(annual / 12);

        setQuote({ monthly, annual });
    };

    if (isLoading) return <Loading />;
    if (isError || !policy) {
        return (
            <div className="text-center py-20 text-red-500">Policy not found.</div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-screen my-5">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[18rem] rounded-xl overflow-hidden shadow-lg mb-10">
                <img
                    src={policy.image}
                    alt={policy.policyTitle}
                    className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center text-center px-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        {policy.policyTitle}
                    </h1>
                </div>
            </div>
            <p className="mb-4 text-gray-600">{policy.description}</p>

            <div className="space-y-6 mb-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder={`Enter your age (${policy.minAge}-${policy.maxAge})`} />
                    <Select
                        value={form.gender}
                        onValueChange={(value) =>
                            setForm((prev) => ({ ...prev, gender: value }))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="number"
                        name="coverage"
                        value={form.coverage}
                        onChange={handleChange}
                        placeholder={`Coverage Amount (৳${policy.coverageFrom.toLocaleString()} - ৳${policy.coverageTo.toLocaleString()})`} />
                    <Input
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder={`Duration in years (1-${policy.duration})`}
                    />
                </div>

                <Select
                    value={form.smoker}
                    onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, smoker: value }))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select smoking status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="no">Non-Smoker</SelectItem>
                        <SelectItem value="yes">Smoker</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex justify-center">
                    <Button className="text-white cursor-pointer" onClick={handleQuote}>Get Estimated Premium</Button>
                </div>
            </div>

            {quote && (
                <div className="bg-gray-100 dark:bg-[#1f1f1f] p-4 rounded-lg space-y-2 text-lg">
                    <p>
                        <strong>Estimated Monthly Premium:</strong> ৳{quote.monthly}
                    </p>
                    <p>
                        <strong>Estimated Annual Premium:</strong> ৳{quote.annual}
                    </p>
                    <Button onClick={() => navigate(`/apply/${id}`)} className="mt-4 text-white cursor-pointer">
                        Apply for Policy
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Quote;
