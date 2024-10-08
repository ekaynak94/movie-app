import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ThemedSafeAreaView } from "@/components/ThemedView";
import MovieListItem from "@/components/MovieListItem";
import { getMovies } from "@/api/movieService";
import { Movie } from "@/types/movieTypes";
import SearchBar from "@/components/SearchBar";

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMovies = async () => {
    const results = await getMovies(query); // Fetch movies based on user input
    setMovies(results.Search);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={searchMovies}
        />
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieListItem
              title={item.Title}
              posterUrl={item.Poster}
              onPress={() => {
                console.log(`MOVIE Pressed: ${item.Title}`);
              }}
            />
          )}
        />
      </View>
    </ThemedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
});

export default SearchScreen;
