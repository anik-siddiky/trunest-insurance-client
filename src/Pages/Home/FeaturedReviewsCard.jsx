import React from 'react';
import { Star } from 'lucide-react';

const FeaturedReviewsCard = ({ review }) => {
  const { image, name, policyTitle, rating, feedback } = review;

  return (
    <div className='my-6'>
      <div className="group relative flex flex-col items-center text-center bg-gradient-to-b from-white to-gray-50 dark:from-[#1b1b1b] dark:to-[#111] rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-6 h-80">

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-[#078338]/20 via-transparent to-[#078338]/10 pointer-events-none"></div>

        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-[#078338] to-black group-hover:bg-gradient-to-l transition duration-500">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-[#078338]/40 opacity-40 animate-pulse pointer-events-none"></div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#078338] transition">
          {name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 italic">
          {policyTitle}
        </p>

        <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              fill={i < rating ? 'currentColor' : 'none'}
              stroke={i < rating ? 'none' : 'currentColor'}
              strokeWidth={1.5}
            />
          ))}
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-4">
          “{feedback}”
        </p>
      </div>
    </div>
  );
};

export default FeaturedReviewsCard;
