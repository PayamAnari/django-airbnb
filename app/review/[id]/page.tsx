"use client"


import apiService from "@/app/services/apiService";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDate } from "@/app/components/forms/FormatDate";

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  date_joined: string;
}

interface Property {
  title: string;
}
interface Review {
  id: string;
  property: Property;
  user: User;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

interface ReviewsPageProps {
  propertyId: string;
}

const ReviewPage: React.FC<ReviewsPageProps> = ({
  propertyId,
}) => {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await apiService.get(`/api/reviews/${propertyId}/reviews/`);
        
        setReviews(reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [propertyId]);

return (
  <div className="max-w-[1500px] mx-auto px-6 pb-6 mt-8">
    <h1>Reviews</h1>
      {reviews.length === 0 ? (
          <p>No reviews yet.</p>
      ) : (
        <div className="flex flex-col border space-x-4 px-6 py-6 mt-2 gap-2 rounded-xl shadow-xl">
          <ul>
              {reviews.map((review) => (
                  <li key={review.id}>
                    <p>Review for {review.property.title}</p>
                    <p>{review.rating}/5 . {formatDate(review.created_at)}</p>
                    <p className="mt-2">{review.comment}</p>
                    <div className="py-6 flex items-center space-x-4 mt-6">
                      <Image
                        src={review.user.avatar_url}
                        width={50}
                        height={50}
                        className="rounded-full border border-gray-500"
                        alt="The user name"
                      />
                      <div className="flex flex-col">
                      <p><strong>{review.user.name}</strong> </p>
                      <p>{formatDate(review.user.date_joined)} on Airbnb</p>
                      </div>
                    </div>
                     
                  </li>
              ))}
          </ul>
        </div>
      )}
  </div>
);
};

export default ReviewPage;