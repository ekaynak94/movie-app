import React from "react";
import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Movie } from "@/types/movieTypes";
import { Link } from "expo-router";

interface MovieListItemProps {
  movie: Movie;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
  return (
    <Link
      asChild
      href={{
        pathname: "../details/[imdbId]",
        params: { ...movie },
      }}
    >
      <Pressable style={styles.container}>
        <ImageBackground
          source={{ uri: movie.Poster }}
          style={styles.imageBackground}
          imageStyle={styles.image} // To style the image itself
        >
          <View style={styles.overlay}>
            <ThemedText type="title" lightColor="#e8e8e8" darkColor="#fff">
              {movie.Title}
            </ThemedText>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    backgroundColor: "red",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 16,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    borderRadius: 15,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
});

export default MovieListItem;
