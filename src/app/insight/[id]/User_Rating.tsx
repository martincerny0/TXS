"use client";
import React from 'react';
import StarRating  from '@/app/_components/Star_Rating/Star_Rating'

interface UserRatingProps {
    initialRating: number;
}

const UserRating : React.FC<UserRatingProps> = ({initialRating}) => {

    const handleRatingChange = (rating: number) => {
        console.log(rating);
    }

    const isUserRating = true;
    return (
      <>
        <StarRating
          initialRating={initialRating}
          onRatingChange={handleRatingChange}
        />
        {isUserRating && (
          <p className="mt-2 text-sm text-gray-600">
            Thank you for rating this article!
          </p>
        )}
      </>
    );
};

export default UserRating;