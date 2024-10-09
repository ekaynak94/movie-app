import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { Movie } from "../types/movieTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoritesContextType = {
  favorites: { [id: string]: Movie }; // Store favorites as an object with movie IDs as keys
  isFavorite: (id: string) => boolean;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
};

// Create the context
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const FAVORITES_STORAGE_KEY = "FAVORITES";

// Provider component
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize an empty object to store the favorites
  const [favorites, setFavorites] = useState<{ [id: string]: Movie }>({});

  // Load favorites from AsyncStorage when the app starts
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(
          FAVORITES_STORAGE_KEY
        );
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from AsyncStorage:", error);
      }
    };

    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites)
        );
      } catch (error) {
        console.error("Failed to save favorites to AsyncStorage:", error);
      }
    };

    if (Object.keys(favorites).length > 0) {
      saveFavorites();
    }
  }, [favorites]);

  const isFavorite = (id: string) => {
    return !!favorites[id]; // Check if the movie ID exists in the favorites object
  };

  const addFavorite = (movie: Movie) => {
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
