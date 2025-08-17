import React, { useState, useEffect } from 'react';
import useAxios from '@/Hooks/useAxios';
import AllPoliciesCard from './AllPoliciesCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from '@/components/ui/pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/Loading';

const POLICIES_PER_PAGE = 9;

const AllPolicies = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const axios = useAxios();

    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setPage(1);
    }, [category, debouncedSearch]);

    const { data, isLoading, isError, } = useQuery({
        queryKey: ['policies', category, debouncedSearch, page],
        queryFn: async () => {
            const res = await axios.get('/policies', {
                params: {
                    category,
                    search: debouncedSearch,
                    page,
                    limit: POLICIES_PER_PAGE,
                },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    const policies = data?.policies || [];
    const totalPolicies = data?.totalPolicies || 0;
    const totalPages = Math.ceil(totalPolicies / POLICIES_PER_PAGE);

    return (
        <div className="min-h-screen max-w-7xl mx-auto py-8 px-4 lg:mb-16 overflow-x-hidden">
            <div className="text-center mb-10">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Explore Our Insurance Plans
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
                    Discover tailored insurance solutions designed to protect what matters most. <br className='hidden lg:block' /> Your health,
                    assets, and future. Choose the right plan and get covered with confidence.
                </p>
            </div>

            <div className="flex justify-end flex-wrap gap-3 mb-6 lg:mb-8">
                <Select
                    value={category || 'all'}
                    onValueChange={(value) => setCategory(value === 'all' ? '' : value)}>
                    <SelectTrigger className="w-full lg:w-60">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Insurance Categories</SelectLabel>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="life">Life Insurance</SelectItem>
                            <SelectItem value="health">Health Insurance</SelectItem>
                            <SelectItem value="critical-illness">Critical Illness</SelectItem>
                            <SelectItem value="heart">Heart Insurance</SelectItem>
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {isLoading ? (
                <Loading></Loading>
            ) : isError ? (
                <div className="text-center py-20 text-lg text-red-500">Failed to load policies. Please try again.</div>
            ) : policies.length > 0 ? (
                <>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {policies.map((policy) => (
                            <AllPoliciesCard key={policy._id} policy={policy} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (page > 1) setPage((prev) => prev - 1);
                                            }}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }, (_, i) => {
                                        const pageNumber = i + 1;
                                        return (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={page === pageNumber}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setPage(pageNumber);
                                                    }}
                                                >
                                                    {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (page < totalPages) setPage((prev) => prev + 1);
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        No Policies Found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        We couldn’t find any policies matching your search or selected category. Try adjusting your
                        filters or search terms to explore more options.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllPolicies;
