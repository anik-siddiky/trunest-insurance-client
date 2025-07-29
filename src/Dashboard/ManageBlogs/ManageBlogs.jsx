import Loading from '@/components/Loading';
import useAxios from '@/Hooks/useAxios';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import BlogsAddingModal from './BlogsAddingModal';
import BlogsUpdatingModal from './BlogsUpdatingModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import useUserRole from '@/Hooks/useUserRole';
import useAuth from '@/Hooks/useAuth';

const ManageBlogs = () => {
    const { user } = useAuth();
    const { role } = useUserRole();
    const axios = useAxios();
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedBlogToEdit, setSelectedBlogToEdit] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const params =
                role === 'agent'
                    ? `/blogs?role=agent&email=${user?.email}`
                    : '/blogs';

            const res = await axios.get(params);
            return res.data;
        },
        enabled: !!user?.email && !!role,
    });


    const blogs = data || [];

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleBlogAdded = () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        setIsAddModalOpen(false);
    };

    const handleBlogUpdated = () => {
        queryClient.invalidateQueries({ queryKey: ['blogs'] });
        setIsEditModalOpen(false);
    };

    const deleteBlog = async (id) => {
        const res = await axios.delete(`/blogs/${id}`);
        return res.data;
    };

    const { mutate: handleDelete, isPending: isDeleting } = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            toast('Blog deleted successfully!');
            setBlogToDelete(null);
        },
        onError: (err) => {
            toast.error(`Failed to delete blog: ${err.message}`);
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="p-3 lg:p-6 min-h-screen">
            <BlogsAddingModal open={isAddModalOpen} setOpen={setIsAddModalOpen} onBlogAdded={handleBlogAdded} />
            <BlogsUpdatingModal open={isEditModalOpen} setOpen={setIsEditModalOpen} blog={selectedBlogToEdit} onBlogUpdated={handleBlogUpdated} />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200">Manage Blogs</h2>
                <div className='flex items-center gap-3'>
                    <button onClick={() => setIsAddModalOpen(true)} className="cursor-pointer bg-primary text-white px-4 py-1.5 rounded-sm shadow-sm transition transform active:scale-95">
                        <span className='lg:block hidden'>Add a Blog</span> <span className='lg:hidden'>Add</span>
                    </button>
                    <Input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-md w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>

            <div className="hidden lg:block overflow-x-auto rounded-md border dark:border-[#171717]">
                <table className="w-full min-w-[800px] text-left text-sm">
                    <thead className="bg-gray-100 dark:bg-[#171717] text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Author</th>
                            <th className="px-4 py-3">Publish Date</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-[#171717]">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-[#1717176b] transition">
                                    <td className="px-4 py-3">{blog.title}</td>
                                    <td className="px-4 py-3">
                                        {blog.author
                                            ? `${blog.author.displayName} (${blog.author.email})`
                                            : "Unknown Author"}
                                    </td>
                                    <td className="px-4 py-3">{new Date(blog.publishDate).toLocaleDateString()}</td>
                                    <td className="px-4 py-2.5 flex gap-3">
                                        <button
                                            onClick={() => {
                                                setSelectedBlogToEdit(blog);
                                                setIsEditModalOpen(true);
                                            }}
                                            className="cursor-pointer inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => setBlogToDelete(blog)}
                                            className="cursor-pointer inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500 dark:text-gray-400">No blogs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            
            <div className="lg:hidden space-y-4">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blog => (
                        <div key={blog._id} className="border rounded-md p-4 shadow-sm dark:border-[#171717] dark:bg-[#1f1f1f]">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{blog.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Author:</strong> {blog.author ? blog.author.displayName : "Unknown"}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Date:</strong> {new Date(blog.publishDate).toLocaleDateString()}</p>
                            <div className="flex gap-4 mt-3">
                                <button
                                    onClick={() => {
                                        setSelectedBlogToEdit(blog);
                                        setIsEditModalOpen(true);
                                    }}
                                    className="inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95">
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => setBlogToDelete(blog)}
                                    className="inline-flex items-center gap-2 rounded bg-black dark:bg-white bg-opacity-90 px-2.5 py-1 text-white dark:text-black text-xs shadow-md hover:scale-105 hover:shadow-lg active:scale-95"
                                >
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No blogs found.</p>
                )}
            </div>

            <AlertDialog open={!!blogToDelete} onOpenChange={(open) => !open && setBlogToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this blog?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Blog: <strong>{blogToDelete?.title}</strong>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="text-white cursor-pointer"
                            disabled={isDeleting}
                            onClick={() => handleDelete(blogToDelete._id)}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageBlogs;
