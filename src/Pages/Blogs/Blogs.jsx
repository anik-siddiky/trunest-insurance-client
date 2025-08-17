import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./BlogCard";
import Loading from "@/components/Loading";
import useAxios from "@/Hooks/useAxios";

const fetchBlogs = async (axios) => {
    const response = await axios.get("/blogs");
    return response.data;
};

const Blogs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const axios = useAxios();

    const { data: blogs = [], error, isLoading, isError } = useQuery({
        queryKey: ["blogs"],
        queryFn: () => fetchBlogs(axios),
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <p className="text-center mt-8 text-red-500">
                Error fetching blogs: {error.message}
            </p>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8 lg:py-12 px-4 lg:px-0">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Our Latest Blogs
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Explore insightful articles and tips on insurance, financial planning,
                    and more. Stay informed and make smarter decisions for your future.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
                {blogs.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No blogs found.
                    </p>
                )}
                {blogs.map((blog) => (
                    <BlogCard key={blog._id || blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
