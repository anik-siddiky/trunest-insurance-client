import useAxios from '@/Hooks/useAxios';
import React, { useEffect, useState } from 'react';
import FeaturedReviewsCard from './FeaturedReviewsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowRightWideFill } from "react-icons/ri";

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
        <div className="relative py-12 max-w-7xl mx-auto px-4 lg:px-0">
            <div className="text-center mb-8 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    What Our Customers Say
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    Hear from our valued clients about how our insurance policies helped them achieve peace of mind.
                </p>
            </div>

            <div className="absolute -left-6 top-1/2 -translate-y-1/2 z-10">
                <button className="swiper-button-prev p-2 rounded-full  text-white transition">
                    <RiArrowRightWideFill />
                </button>
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                <button className="swiper-button-next p-2 rounded-full  text-white transition">
                    <RiArrowRightWideFill />
                </button>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={1.2}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {reviews.map(review => (
                    <SwiperSlide key={review._id}>
                        <FeaturedReviewsCard review={review} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeaturedReviews;
