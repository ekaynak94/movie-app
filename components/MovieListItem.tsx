import React from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
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
        <Image source={{ uri: movie.Poster }} style={styles.poster} />

        <View style={styles.content}>
          <ThemedText
            style={styles.title}
            lightColor="#000"
            darkColor="#fff"
            type="title"
          >
            {movie.Title}
          </ThemedText>
          <ThemedText
            style={styles.year}
            lightColor="#777"
            darkColor="#ccc"
            type="default"
          >
            {movie.Year}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 18,
  },
  year: {
    fontSize: 14,
  },
});

export default MovieListItem;
