import apiService from "@/app/services/apiService";
import { useState } from "react";
import { toast } from 'react-toastify';
import StarRating from "@/app/review/StarRating";


interface ReviewFormProps {
  propertyId: string;
  addReview: (review: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ propertyId, addReview }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const resetForm = () => {
    setRating(0);
    setComment("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !comment) {
      toast.error("Please provide a rating and comment.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("rating", rating.toString());
      formData.append("comment", comment);

      const response = await apiService.postReview(`/api/reviews/${propertyId}/create/`, formData);
      
      if (response.success) {
        toast.success("Review added successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        addReview(response);
        resetForm();
        window.location.reload();
      } else {
        toast.error("Failed to submit review. Please try again.");
        console.log("Error:", response.errors);
        
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold">Write a Review</h2>
      <label className="block" htmlFor="rating">
        <span className="text-gray-700">Rating</span>
        <StarRating  rating={rating} onRatingChange={setRating} />
       
      </label>
      <label className="block" htmlFor="comment">
        <span className="text-gray-700">Comment</span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mt-2 pl-2 pt-2 block w-full border border-gray-300 rounded-lg"
          rows={3}
        />
      </label>
      <button
        type="submit"
        className="bg-airbnb hover:bg-airbnb-dark text-white py-2 px-4 rounded"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
