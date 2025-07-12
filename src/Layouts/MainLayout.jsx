import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto px-4 lg:px-0 pt-[56px] lg:pt-[72px]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;