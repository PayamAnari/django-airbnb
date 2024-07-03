import Image from "next/image";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Image
      key={index}
      src={index < rating ? "/star.png" : "/star1.png"}
      width={22}
      height={20}
      alt="Star icon"
    />
  ));
  return <div className="flex">{stars}</div>;
};

export default StarRating;
