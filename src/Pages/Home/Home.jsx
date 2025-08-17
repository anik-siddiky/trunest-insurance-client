import React, { useEffect } from 'react';
import Hero from './Hero';
import TopSixInsurance from './TopSixInsurance';
import LatestBlogs from './LatestBlogs';
import FeaturedReviews from './FeaturedReviews';
import FeaturedAgents from './FeaturedAgents';
import NewsLetter from './NewsLetter';
import MarqueeHome from './MarqueeHome';
import WhyChooseUs from './WhyChooseUs';
import FAQSection from './FAQSection';
import CompanyStats from './CompanyStats';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen">
            <Hero />
            <MarqueeHome />
            <div className="px-4 md:px-6 lg:px-0">
                <div className="max-w-7xl mx-auto space-y-10 lg:space-y-16">
                    <div className="pt-8">
                        <WhyChooseUs />
                    </div>
                    <TopSixInsurance />
                    <LatestBlogs />
                    <FeaturedReviews />
                    <FeaturedAgents />
                    <FAQSection />
                    <CompanyStats />
                    <div className="pb-10 lg:pb-16">
                        <NewsLetter />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
