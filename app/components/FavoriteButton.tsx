"use client"

import apiService from "../services/apiService";
import { useState } from "react";

interface FavoriteButtonProps {
  id: string;
  is_favorite: boolean;
  markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  is_favorite,
  markFavorite
}) => { 
  const [isHovered, setIsHovered] = useState(false);
  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const response = await apiService.post(`/api/properties/${id}/toggle_favorite/`, {});
    markFavorite(response.is_favorite);
  }

  return (
    <div
      onClick={toggleFavorite}
      className={`absolute top-3 right-3 hover:text-airbnb cursor-pointer`}
      style={{ transition: "transform 0.2s ease-in-out" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill={is_favorite ? "#FF0000" : "#808080"} 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke={is_favorite ? "#FF0000" : "#808080"} 
        style={{ width: '27px', height: '27px', transform: isHovered ? 'scale(1.1)' : 'scale(1)'}}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          stroke="#FFFFFF"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
        />
      </svg>
    </div>
  );
}

export default FavoriteButton;
