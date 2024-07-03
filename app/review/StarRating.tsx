import Image from "next/image";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Image
      key={index}
      src={index < (hoverRating || rating) ? "/star.png" : "/star1.png"}
      width={22}
      height={20}
      alt="Star icon"
      onClick={() => handleClick(index)}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    />
  ));

  return <div className="flex">{stars}</div>;
};

export default StarRating;
