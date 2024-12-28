import React, { useState } from 'react'
import { Star } from 'lucide-react'

interface StarRatingProps {
  initialRating?: number
  onRatingChange?: (rating: number) => void
}

const StarRating : React.FC <StarRatingProps> = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const handleRating = (currentRating: number) => {
    setRating(currentRating)
    if (onRatingChange) {
      onRatingChange(currentRating)
    }
  }

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            star <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  )
}

export default StarRating
