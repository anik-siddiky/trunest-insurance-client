import React from 'react';
import Hero from './Hero';
import TopSixInsurance from './TopSixInsurance';
import LatestBlogs from './LatestBlogs';
import FeaturedReviews from './FeaturedReviews';
import FeaturedAgents from './FeaturedAgents';
import NewsLetter from './NewsLetter';
import MarqueeHome from './MarqueeHome';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <MarqueeHome></MarqueeHome>
            <div className='max-w-7xl mx-auto px-4 lg:px-0'>
                <TopSixInsurance></TopSixInsurance>
                <LatestBlogs></LatestBlogs>
                <FeaturedReviews></FeaturedReviews>
                <FeaturedAgents></FeaturedAgents>
                <NewsLetter></NewsLetter>
            </div>
        </div>
    );
};

export default Home;