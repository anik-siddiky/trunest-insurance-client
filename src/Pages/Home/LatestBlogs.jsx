import React from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../Blogs/BlogCard";
import Loading from "@/components/Loading";
import useAxios from "@/Hooks/useAxios";

const fetchLatestBlogs = async (axios) => {
    const response = await axios.get("/blogs/latest");
    return response.data;
};

const LatestBlogs = () => {
    const axios = useAxios();

    const { data: blogs = [], error, isLoading, isError } = useQuery({
        queryKey: ["latestBlogs"],
        queryFn: () => fetchLatestBlogs(axios),
    });

    if (isLoading) return <Loading />;

    if (isError) {
        return (
            <p className="text-center mt-8 text-red-500">
                Error fetching latest blogs: {error.message}
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 lg:py-16 px-4 lg:px-0">
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    Latest Articles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                    Stay up-to-date with our newest insights on insurance, planning, and financial wellness.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {blogs.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
                        No recent blogs available.
                    </p>
                ) : (
                    blogs.map((blog) => (
                        <BlogCard key={blog._id || blog.id} blog={blog} />
                    ))
                )}
            </div>
        </div>
    );
};

export default LatestBlogs;
