import Navbar from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const ErrorLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default ErrorLayout;