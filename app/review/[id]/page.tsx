"use client"


import apiService from "@/app/services/apiService";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDate } from "@/app/components/forms/FormatDate";
import ReviewForm from "@/app/createreview/[id]/page";

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
  <div className="max-w-[1100px] mx-auto px-4 pb-4 mt-8">
    <div className="flex flex-col border space-x-4 px-4 py-6 mt-2 gap-2 rounded-xl shadow-2xl">
      <ReviewForm propertyId={propertyId} addReview={(review) => setReviews([...reviews, review])} />
      </div>
    <h1 className="mt-8 text-xl font-semibold">Reviews</h1>
      {reviews.length === 0 ? (
          <p>No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-x-4 px-4 py-6 mt-2 gap-2 ">
          
              {reviews.map((review) => {
                if (!review) return null; 
                   return (
                  <div key={review.id}
                   className="bg-white p-4 mb-4 rounded shadow-xl"
                  >
                    <h2 className="text-lg font-bold">{review?.property?.title}</h2>
                    <p className="text-gray-600">{review?.rating}/5 . {formatDate(review.created_at)}</p>
                    <p className="mt-2 text-gray-600">{review?.comment}</p>
                    <div className="py-6 flex items-center space-x-4 mt-8">
                      <Image
                        src={review?.user?.avatar_url}
                        width={50}
                        height={50}
                        className="rounded-full border border-gray-500 "
                        alt="The user name"
                      />
                      <div className="flex flex-col">
                      <p><strong>{review?.user?.name}</strong> </p>
                      <p>{formatDate(review?.user?.date_joined)} on Airbnb</p>
                      </div>
                    </div>
                     
                  </div>
              )
            })}
          
        </div>
      
        </div>
      )}
      

  </div>
);
};

export default ReviewPage;