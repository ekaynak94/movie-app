// Define types for the movie data returned by the API
interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  Error?: string;
}

// API base configuration
const API_BASE_URL = "https://movie-database-alternative.p.rapidapi.com/";
const API_KEY = "";

// Function to fetch movies based on a query
export const getMovies = async (query: string): Promise<MovieResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}?s=${query}&r=json`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });

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
): Promise<MovieDetail> => {
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

    const data: MovieDetail = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
