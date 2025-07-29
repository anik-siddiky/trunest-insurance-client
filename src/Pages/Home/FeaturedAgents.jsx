import useAxios from '@/Hooks/useAxios';
import React, { useEffect, useState } from 'react';

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

    if (loading) return <p className="text-center text-gray-500 dark:text-gray-400">Loading agents...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Meet Our Expert Agents
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    Our professional agents are here to help you find the perfect insurance coverage tailored to your needs.
                </p>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {agents.map(({ _id, name, email, role, photoURL }) => (
                    <div
                        key={_id}
                        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-primary shadow-md">
                            <img
                                src={photoURL}
                                alt={name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate max-w-xs">{email}</p>

                        <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                            {role}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedAgents;
