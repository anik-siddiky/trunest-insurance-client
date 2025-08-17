import React from 'react';
import Hero from './Hero';
import TopSixInsurance from './TopSixInsurance';
import LatestBlogs from './LatestBlogs';
import FeaturedReviews from './FeaturedReviews';
import FeaturedAgents from './FeaturedAgents';
import NewsLetter from './NewsLetter';
import MarqueeHome from './MarqueeHome';
import WhyChooseUs from './WhyChooseUs';
import FAQSection from './FAQSection';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero></Hero>
            <MarqueeHome></MarqueeHome>
            <div className='max-w-7xl mx-auto px-4 lg:px-0 space-y-10 lg:space-y-16'>
                <div className='pt-10 lg:pt-16'>
                    <WhyChooseUs></WhyChooseUs>
                </div>
                <TopSixInsurance></TopSixInsurance>
                <LatestBlogs></LatestBlogs>
                <FeaturedReviews></FeaturedReviews>
                <FeaturedAgents></FeaturedAgents>
                <FAQSection></FAQSection>
                <div className='pb-10 lg:pb-16'>
                    <NewsLetter></NewsLetter>
                </div>
            </div>
        </div>
    );
};

export default Home;