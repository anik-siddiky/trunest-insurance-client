import useAxios from '@/Hooks/useAxios';
import React, { useEffect, useState } from 'react';
import FeaturedReviewsCard from './FeaturedReviewsCard';
import Marquee from "react-fast-marquee";

const FeaturedReviews = () => {
    const axios = useAxios();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('/reviews/featured');
                setReviews(res.data);
            } catch (error) {
                console.error('Failed to fetch featured reviews', error);
            }
        };
        fetchReviews();
    }, [axios]);

    return (
        <section className="relative py-10 rounded-3xl bg-gradient-to-b from-white to-[#f7fdf9] dark:from-[#0f0f0f] dark:to-[#171717] overflow-hidden">
            <div className="absolute top-[-50px] left-[-50px] w-72 h-72 bg-gradient-to-br from-[#078338]/40 via-green-400/20 to-transparent rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite] transition-transform duration-700 ease-in-out group-hover:-translate-x-12 group-hover:translate-y-12" />

            <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-gradient-to-tr from-green-600/30 via-[#078338]/20 to-transparent rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite] transition-transform duration-700 ease-in-out group-hover:translate-x-16 group-hover:-translate-y-16" />

            <div className="relative max-w-7xl mx-auto z-10 px-6 lg:px-0 text-center">
                <div className="mb-8 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        What Our Customers Say
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                        Hear from our valued clients about how our insurance policies helped them achieve peace of mind.
                    </p>
                </div>

                <Marquee
                    gradient={false}
                    speed={40}
                    pauseOnHover={true}
                    className="flex gap-6">
                    {reviews.map(review => (
                        <div key={review._id} className="mx-4 w-[320px]">
                            <FeaturedReviewsCard review={review} />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default FeaturedReviews;
