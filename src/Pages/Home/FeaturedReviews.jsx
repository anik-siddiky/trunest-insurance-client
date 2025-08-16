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
        <div className="relative py-12 max-w-7xl mx-auto">
            <div className="text-center mb-8 max-w-3xl mx-auto">
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
    );
};

export default FeaturedReviews;
