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
        <div className="max-w-7xl mx-auto p-6 min-h-screen my-5 lg:mb-28">
            <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl mb-12">
                <img
                    src={policy.image}
                    alt={policy.policyTitle}
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
                        {policy.policyTitle}
                    </h1>
                </div>
            </div>

            <p className="mb-10 leading-relaxed text-gray-700 dark:text-gray-300 max-w-7xl mx-auto text-center">
                {policy.description}
            </p>

            <div className="bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto space-y-8">

                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
                    Get Your Quote
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                        type="number"
                        name="age"
                        value={form.age}
                        onChange={handleChange}
                        placeholder={`Enter your age (${policy.minAge}-${policy.maxAge})`}
                    />
                    <Select
                        value={form.gender}
                        onValueChange={(value) =>
                            setForm((prev) => ({ ...prev, gender: value }))
                        }>
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
                        placeholder={`Coverage (৳${policy.coverageFrom.toLocaleString()} - ৳${policy.coverageTo.toLocaleString()})`}
                    />
                    <Input
                        type="number"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        placeholder={`Duration (1 - ${policy.duration} years)`}
                    />
                </div>

                <Select
                    value={form.smoker}
                    onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, smoker: value }))
                    }>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Smoking Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="no">Non-Smoker</SelectItem>
                        <SelectItem value="yes">Smoker</SelectItem>
                    </SelectContent>
                </Select>

                <div className="flex justify-center">
                    <button
                        onClick={handleQuote}
                        className="rounded-xl font-semibold px-6 lg:px-8 py-2 lg:py-2.5 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointer">
                        Get Estimated Premium
                    </button>
                </div>
            </div>


            {quote && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-gray-700 shadow-xl rounded-2xl p-8 w-full max-w-3xl">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-primary">
                            💡 Your Estimated Premium
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center text-lg">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-inner">
                                <p className="text-gray-600 dark:text-gray-300">Monthly Premium</p>
                                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    ৳{quote.monthly}
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-inner">
                                <p className="text-gray-600 dark:text-gray-300">Annual Premium</p>
                                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    ৳{quote.annual}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button
                                onClick={() =>
                                    navigate(`/apply/${id}`, {
                                        state: {
                                            quote,
                                            form,
                                            policyTitle: policy.policyTitle,
                                        },
                                    })
                                }
                                className="rounded-xl font-semibold px-6 lg:px-8 py-2 lg:py-2.5 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointer">
                                Apply for Policy
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Quote;
