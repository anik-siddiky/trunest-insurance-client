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
            className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white dark:bg-[#171717] 
                       shadow-md rounded-3xl overflow-hidden cursor-pointer transition-transform 
                       duration-500 hover:scale-102 hover:shadow-2xl group border border-gray-100 dark:border-gray-800">

            {/* Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 rounded-3xl"></div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                        {blog.title}
                    </h2>
                    <p className="text-sm mb-4 text-gray-500 dark:text-gray-400 italic">
                        By {blog.author?.displayName || "Unknown"}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                        {truncateText(blog.content, 30)}
                    </p>
                </div>

                <Link to={`/blog-details/${blog?._id}`}>
                    <button className="w-full rounded-xl font-semibold py-2 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointer">
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
