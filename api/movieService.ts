import { Movie, MovieDetails } from "../types/movieTypes";

interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

interface MovieDetailResponse extends MovieDetails {
  Response: string;
  Error?: string;
}

// API base configuration
const API_BASE_URL = "https://movie-database-alternative.p.rapidapi.com/";
const API_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY || "";

// Function to fetch movies based on a query
export const getMovies = async (
  query: string,
  page = 1
): Promise<MovieResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?s=${query}&r=json&page=${page}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
          "x-rapidapi-key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data: MovieResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Function to fetch details of a single movie by its IMDb ID
export const getMovieDetails = async (
  movieId: string
): Promise<MovieDetailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?i=${movieId}&r=json`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching movie details: ${response.statusText}`);
    }

    const data: MovieDetailResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
