"use client"

import apiService from "../services/apiService";

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
  return (

  )
}


export default FavoriteButton;