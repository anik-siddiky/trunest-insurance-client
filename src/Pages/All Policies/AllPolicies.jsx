import React, { useEffect, useState } from 'react';
import useAxios from '@/Hooks/useAxios';
import AllPoliciesCard from './AllPoliciesCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const AllPolicies = () => {
    const axios = useAxios();
    const [policies, setPolicies] = useState([]);

    useEffect(() => {
        axios.get('/policies')
            .then(res => setPolicies(res.data))
            .catch(err => console.error(err));
    }, [axios]);

    return (
        <div className="min-h-screen max-w-7xl mx-auto py-8 px-4 overflow-x-hidden">
            <div className="text-center mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Explore Our Insurance Plans
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
                    Discover tailored insurance solutions designed to protect what matters most — your health, assets, and future. Choose the right plan and get covered with confidence.
                </p>
            </div>

            <div className="flex justify-end flex-wrap gap-3 mb-6 lg:mb-8">
                <Select onValueChange={() => { }}>
                    <SelectTrigger className="w-full lg:w-60">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Insurance Categories</SelectLabel>
                            <SelectItem value="life">Life Insurance</SelectItem>
                            <SelectItem value="health">Health Insurance</SelectItem>
                            <SelectItem value="critical-illness">Critical Illness</SelectItem>
                            <SelectItem value="home">Homeowners</SelectItem>
                            <SelectItem value="renters">Renters</SelectItem>
                            <SelectItem value="travel">Travel</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="motorcycle">Motorcycle</SelectItem>
                            <SelectItem value="earthquake">Earthquake</SelectItem>
                            <SelectItem value="long-term-care">Long-Term Care</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Input
                    type="text"
                    placeholder="Search policies..."
                    className="w-full lg:w-80"
                />
            </div>


            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    policies.map(policy => (
                        <AllPoliciesCard key={policy._id} policy={policy} />
                    ))
                }
            </div>
        </div>
    );
};

export default AllPolicies;
