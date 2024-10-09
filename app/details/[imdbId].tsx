import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getMovieDetails } from "@/api/movieService";
import { Movie, MovieDetails } from "@/types/movieTypes";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFavorites } from "@/context/favoritesContext";

export default function Details() {
  const { imdbID, Title, Poster } = useLocalSearchParams<Partial<Movie>>();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const color = useThemeColor({}, "text");

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isMovieFavorite = isFavorite(imdbID as string);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getMovieDetails(imdbID as string);
        setMovieDetails(details);
      } catch {
        Alert.alert(
          "Error",
          "Failed to fetch movie details. Please try again."
        );
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDetails();
  }, [imdbID]);

  // Toggle the favorite status
  const handleFavoritePress = () => {
    if (isMovieFavorite) {
      removeFavorite(imdbID as string);
    } else {
      addFavorite({ imdbID, Title, Poster } as Movie);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#fff", dark: "#000" }}
      headerImage={
        <Image
          source={
            Poster ? { uri: Poster } : require("@/assets/images/icon.png")
          }
          style={styles.poster}
        />
      }
    >
      <ThemedView style={styles.content}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            {Title}
          </ThemedText>
          <TouchableOpacity onPress={handleFavoritePress}>
            <Ionicons
              name={isMovieFavorite ? "bookmark" : "bookmark-outline"}
              size={24}
              color={color}
              style={{ padding: 8 }}
            />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="gold" />
              <ThemedText style={styles.ratingText} type="defaultSemiBold">
                {`${movieDetails?.imdbRating}/10 IMDb`}
              </ThemedText>
            </View>

            <ThemedText style={styles.descriptionTitle} type="subtitle">
              Description
            </ThemedText>
            <ThemedText style={styles.descriptionText} type="default">
              {movieDetails?.Plot}
            </ThemedText>
          </>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  poster: {
    height: 320,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  content: {
    minHeight: 320,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  title: { maxWidth: "75%", fontSize: 24 },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 5,
  },
});
