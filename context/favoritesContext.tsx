import React, { createContext, useState, useContext, ReactNode } from "react";
import { MovieDetails } from "../types/movieTypes";

type FavoritesContextType = {
  favorites: { [id: string]: MovieDetails }; // Store favorites as an object with movie IDs as keys
  isFavorite: (id: string) => boolean;
  addFavorite: (movie: MovieDetails) => void;
  removeFavorite: (id: string) => void;
};

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

// Provider component
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize an empty object to store the favorites
  const [favorites, setFavorites] = useState<{ [id: string]: MovieDetails }>(
    {}
  );

  const isFavorite = (id: string) => {
    return !!favorites[id]; // Check if the movie ID exists in the favorites object
  };

  const addFavorite = (movie: MovieDetails) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [movie.imdbID]: movie, // Add the movie with its ID as the key
    }));
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[id]; // Remove the movie by its ID
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
