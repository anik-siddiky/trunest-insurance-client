import React from 'react';
import { FaBan } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4'>
            <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'>
                <div className='flex justify-center mb-4'>
                    <FaBan className='text-red-500 text-6xl' />
                </div>
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>403 Forbidden</h2>
                <p className='text-gray-600 mb-6'>
                    You don't have permission to access this resource.
                </p>
                <div className='space-y-3'>
                    <p className='text-sm text-gray-500'>
                        Possible reasons:
                    </p>
                    <ul className='text-sm text-gray-500 space-y-1'>
                        <li className='flex items-center justify-center'>
                            <svg className='w-4 h-4 mr-2 text-red-500' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Insufficient privileges
                        </li>
                        <li className='flex items-center justify-center'>
                            <svg className='w-4 h-4 mr-2 text-red-500' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Incorrect account type
                        </li>
                        <li className='flex items-center justify-center'>
                            <svg className='w-4 h-4 mr-2 text-red-500' fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Resource requires authentication
                        </li>
                    </ul>
                </div>
                <Link to="/">
                    <button className='cursor-pointer mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200'>
                        Go Back
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Forbidden;