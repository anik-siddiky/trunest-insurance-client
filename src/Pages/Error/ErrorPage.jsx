import React from 'react';
import { FaExclamationTriangle, FaHome, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router';

const ErrorPage = () => {


// 

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
            <div className='bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center'>
                <div className='flex justify-center mb-5'>
                    <div className='bg-red-100 p-4 rounded-full'>
                        <FaExclamationTriangle className='text-red-500 text-5xl' />
                    </div>
                </div>
                <h1 className='text-4xl font-bold text-gray-800 mb-2'>404</h1>
                <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Page Not Found</h2>
                <p className='text-gray-600 mb-6'>
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <div className='space-y-4 mb-6'>
                    <p className='text-sm text-gray-500'>
                        Try one of these instead:
                    </p>
                    <div className='flex flex-col sm:flex-row justify-center gap-3'>
                        <Link
                            to="/"
                            className='flex items-center justify-center rounded-xl font-semibold px-4 py-2 bg-gradient-to-r from-[#078338] to-black hover:from-black hover:to-[#078338] text-white shadow-lg shadow-[#078338]/30 transition duration-500 cursor-pointer'>
                            <FaHome className='mr-2' />
                            Go Home
                        </Link>
                    </div>
                </div>

                <div className='bg-gray-50 p-4 rounded-lg'>
                    <p className='text-sm text-gray-600 mb-2 flex items-center justify-center'>
                        <FaSearch className='mr-2 text-gray-400' />
                        Can't find what you need?
                    </p>
                    <p className='text-sm text-gray-500'>
                        Contact our support team for assistance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;