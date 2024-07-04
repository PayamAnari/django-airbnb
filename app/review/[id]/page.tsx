"use client"

import apiService from "@/app/services/apiService";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDate } from "@/app/components/forms/FormatDate";
import ReviewForm from "@/app/createreview/[id]/page";
import { toast } from 'react-toastify';
import StarRating from "../StarRating";


interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  date_joined: string;
}

interface Property {
  id: string;
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

const ReviewPage: React.FC<ReviewsPageProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await apiService.get(`/api/reviews/${propertyId}/reviews/`);
        setReviews(response.reviews);
        const newAverageRating = calculateAverageRating(response.reviews);
        setAverageRating(newAverageRating);
        setTotalReviews(response.reviews.length);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [propertyId]);

  const deleteReview = async (reviewId: string) => {
    try {
      await apiService.delete(`/api/reviews/${reviewId}/delete/`);
      setReviews((prevReviews) => {
        const updatedReviews = prevReviews.filter((review) => review.id !== reviewId);
        const newAverageRating = calculateAverageRating(updatedReviews);
        setAverageRating(newAverageRating);
        return updatedReviews;
      });
      setTotalReviews((prevTotal) => prevTotal - 1);
      toast.success("Review deleted successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error("Failed to delete review. Please try again.");
    }
  };

  const addReviewHandler = (review: Review) => {
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews, review];
      const newAverageRating = calculateAverageRating(updatedReviews);
      setAverageRating(newAverageRating);
      return updatedReviews;
    });
    setTotalReviews((prevTotal) => prevTotal + 1);
  };

  function calculateAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return totalRating / reviews.length;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-4 mt-8">
      <div className="flex flex-col border space-x-4 px-4 py-6 mt-2 gap-2 rounded-xl shadow-2xl">
        <ReviewForm propertyId={propertyId} addReview={addReviewHandler} />
      </div>
      <h1 className="mt-10 mb-6 text-xl font-semibold">Reviews</h1>
     
      {reviews.length === 0 ? (
        
        <p>No reviews yet.</p>
      ) : (
        <>
        <div className="flex gap-2">
        <Image
          src="/star.png"
          width={22}
          height={20}
          alt="Star icon"
        />
        
        {averageRating !== null && (
          <p className="text-lg font-semibold">{averageRating.toFixed(2)} · {totalReviews} {totalReviews === 1 ? "Review" : "Reviews"}</p>
        )}
      </div>
      
  
        <div className="grid grid-cols-1 md:grid-cols-1 mt-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white relative p-4 mb-4 rounded-xl shadow-2xl review-item">
              <Image
                onClick={() => deleteReview(review.id)}
                src="/close.png"
                width={33}
                height={33}
                alt="Close icon"
                className="top-3 right-3 absolute cursor-pointer"
              />
              <h2 className="text-lg font-bold">{review.property.title}</h2>
              <div className="flex gap-2 mt-2">
                <StarRating rating={review.rating} />
                <p className="text-gray-600"> · {formatDate(review.created_at)} ago</p>
              </div>
              <p className="mt-2 text-gray-600">{review.comment}</p>
              <div className="py-6 flex items-center space-x-4 mt-8">
                <Image
                  src={review.user.avatar_url}
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-500"
                  alt="user"
                />
                <div className="flex flex-col">
                  <p><strong>{review.user.name}</strong></p>
                  <p>{formatDate(review.user.date_joined)} on Airbnb</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export default ReviewPage;
