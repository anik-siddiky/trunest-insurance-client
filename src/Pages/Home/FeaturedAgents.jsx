import useAxios from '@/Hooks/useAxios';
import React, { useEffect, useState } from 'react';
import { Mail, Shield } from "lucide-react";

const FeaturedAgents = () => {
    const axios = useAxios();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await axios.get('/agents/first');
                setAgents(res.data);
            } catch (err) {
                console.error('Failed to load agents', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAgents();
    }, [axios]);

    if (loading)
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                Loading agents...
            </p>
        );

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Meet Our Expert Agents
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                    Our professional agents are here to help you find the perfect
                    insurance coverage tailored to your needs.
                </p>
            </div>

            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {agents.map(({ _id, name, email, role, photoURL }) => (
                    <div
                        key={_id}
                        className="group relative bg-white dark:bg-[#171717] rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 hover:-translate-y-2">
                        <div className="relative w-28 h-28 mb-6">
                            <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-[#078338] to-black group-hover:bg-gradient-to-l transition duration-500">
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    <img
                                        src={photoURL}
                                        alt={name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#078338] transition">
                            {name}
                        </h3>
                        <p className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                            <Mail size={14} /> {email}
                        </p>

                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#078338] to-black text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                            <Shield size={14} /> {role}
                        </span>

                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#078338]/10 via-transparent to-black/10 pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedAgents;
