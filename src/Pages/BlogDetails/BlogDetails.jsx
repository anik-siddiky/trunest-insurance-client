import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '@/Hooks/useAxios';
import Loading from '@/components/Loading';

const BlogDetails = () => {
    const { id } = useParams();
    const axios = useAxios();

    const fetchBlog = async () => {
        const { data } = await axios.get(`/blog/${id}`);
        return data;
    };

    const { data: blog, isLoading, isError, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: fetchBlog,
        enabled: !!id,
    });

    useEffect(() => {
        if (!id) return;

        const timer = setTimeout(async () => {
            try {
                await axios.patch(`/blogs/${id}/increment-view`);
            } catch (err) {
                console.error('Failed to increment view count', err);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, axios]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <p className="text-center mt-10 text-red-500">
                Error loading blog: {error.message}
            </p>
        );
    }

    return (
        <div className='max-w-7xl mx-auto py-8 lg:py-16'>
            <div className="p-4 lg:p-6 dark:bg-[#171717] bg-white rounded-md shadow-md">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-80 object-cover rounded-md mb-8"
                />
                <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    {blog.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    By <span className="font-semibold">{blog.author?.displayName || 'Unknown'}</span> |{' '}
                    {new Date(blog.publishDate).toLocaleDateString()}
                </p>
                <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-300 whitespace-pre-line">
                    {blog.content}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
