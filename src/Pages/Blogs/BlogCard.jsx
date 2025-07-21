import React from "react";
import { Link } from "react-router";

const truncateText = (text, limit = 50) => {
    const words = text?.split(" ") || [];
    if (words.length <= limit) return text || "";
    return words.slice(0, limit).join(" ") + "...";
};

const BlogCard = ({ blog }) => {
    return (
        <div
            className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white dark:bg-[#171717] shadow-md rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105">

            <div className="w-full md:w-1/2 h-48 md:h-auto">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className=" md:w-1/2 p-6 flex flex-col justify-between gap-3">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                        {blog.title}
                    </h2>
                    <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
                        By {blog.author?.displayName || "Unknown"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        {truncateText(blog.content, 40)}
                    </p>
                </div>
                <Link to={`/blog-details/${blog?._id}`}>
                    <button className="cursor-pointer bg-primary text-white px-4 py-1.5 rounded-sm shadow-sm transition transform active:scale-95">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
