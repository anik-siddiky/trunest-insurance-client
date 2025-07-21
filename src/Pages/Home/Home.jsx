import React from 'react';
import Hero from './Hero';
import TopSixInsurance from './TopSixInsurance';
import LatestBlogs from './LatestBlogs';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <div className='max-w-7xl mx-auto px-4 lg:px-0'>
                <TopSixInsurance></TopSixInsurance>
                <LatestBlogs></LatestBlogs>
            </div>
        </div>
    );
};

export default Home;