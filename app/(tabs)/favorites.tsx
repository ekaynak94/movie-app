import React from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useFavorites } from "@/context/favoritesContext";
import MovieListItem from "@/components/MovieListItem";
import { ThemedSafeAreaView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  const favoriteMovies = Object.values(favorites);

  return (
    <ThemedSafeAreaView style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <ThemedText style={styles.emptyText}>
          You haven't added any favorites yet.
        </ThemedText>
      ) : (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <MovieListItem movie={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
});
