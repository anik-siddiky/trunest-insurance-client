/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, Calendar, DollarSign, Users } from "lucide-react";
import useAxios from "@/Hooks/useAxios";
import Loading from "@/components/Loading";

const PolicyDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: policy, isLoading, isError } = useQuery({
        queryKey: ["policy", id],
        queryFn: async () => {
            const res = await axios.get(`/policy/${id}`);
            return res.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <Loading />;

    if (isError || !policy) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-semibold text-red-600">Policy Not Found</h2>
                <p className="text-gray-500">
                    The policy you are looking for doesn't exist or failed to load.
                </p>
            </div>
        );
    }

    const { policyTitle, description, minAge, maxAge, coverageFrom, coverageTo, duration, basePremiumRate, image, eligibility, benefits, } = policy;

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-0 py-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
                <img src={image} alt={policyTitle} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center text-center p-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                        {policyTitle}
                    </h1>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-md flex flex-col items-center text-center">
                    <Users className="text-[#078338] mb-2" size={28} />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Age</p>
                    <h3 className="font-bold text-lg">{minAge} - {maxAge} yrs</h3>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-md flex flex-col items-center text-center">
                    <Shield className="text-[#078338] mb-2" size={28} />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Coverage</p>
                    <h3 className="font-bold text-lg">৳{coverageFrom} - ৳{coverageTo}</h3>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-md flex flex-col items-center text-center">
                    <Calendar className="text-[#078338] mb-2" size={28} />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                    <h3 className="font-bold text-lg">{duration} years</h3>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-md flex flex-col items-center text-center">
                    <DollarSign className="text-[#078338] mb-2" size={28} />
                    <p className="text-sm text-gray-500 dark:text-gray-400">Premium</p>
                    <h3 className="font-bold text-lg">৳{basePremiumRate}</h3>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 bg-white dark:bg-zinc-900 p-6 md:p-10 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    About this Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {description}
                </p>
            </motion.div>

            {eligibility && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-md">
                    <h3 className="text-xl font-semibold mb-2">Eligibility Criteria</h3>
                    <p className="text-gray-600 dark:text-gray-400">{eligibility}</p>
                </motion.div>
            )}

            {benefits && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl shadow-md"
                >
                    <h3 className="text-xl font-semibold mb-2">Benefits</h3>
                    <p className="text-gray-600 dark:text-gray-400">{benefits}</p>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex justify-center">
                <button
                    onClick={() => navigate(`/quote/${id}`)}
                    className="cursor-pointer rounded-2xl font-semibold px-6 lg:px-8 py-2 lg:py-3 text-lg bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-xl shadow-[#078338]/30 transition-all duration-500 hover:scale-105">
                    Get a Free Quote
                </button>
            </motion.div>
        </div>
    );
};

export default PolicyDetails;
