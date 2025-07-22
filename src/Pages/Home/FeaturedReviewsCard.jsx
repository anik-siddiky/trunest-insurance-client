import React from 'react';
import { Star } from 'lucide-react';

const FeaturedReviewsCard = ({ review }) => {
  const { image, name, policyTitle, rating, feedback } = review;

  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-xs mx-auto hover:shadow-xl transition-shadow duration-300 h-full">
      {/* Profile Image with subtle shadow */}
      <div className="relative w-24 h-24 mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-full object-cover border-4 border-primary shadow-md"
        />
        {/* Accent ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary opacity-30 animate-pulse"></div>
      </div>

      {/* Name */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{name}</h3>

      {/* Policy Title */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 italic">{policyTitle}</p>

      {/* Star Rating */}
      <div className="flex items-center justify-center gap-1 text-amber-400 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < rating ? 'currentColor' : 'none'}
            stroke={i < rating ? 'none' : 'currentColor'}
            strokeWidth={1.5}
          />
        ))}
      </div>

      {/* Feedback text */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-5">
        “{feedback}”
      </p>
    </div>
  );
};

export default FeaturedReviewsCard;
