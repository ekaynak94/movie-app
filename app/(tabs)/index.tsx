import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { ThemedSafeAreaView } from "@/components/ThemedView";
import MovieListItem from "@/components/MovieListItem";
import { getMovies } from "@/api/movieService";
import { Movie } from "@/types/movieTypes";
import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";

type SearchParams = {
  query: string;
  results: Movie[];
  hasMore: boolean;
  page: number;
};

const SearchScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    results: [],
    hasMore: true,
    page: 0,
  });

  const searchMovies = async (query: string) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const isNewQuery = query !== searchParams.query;
      const page = isNewQuery ? 1 : searchParams.page + 1;

      const response = await getMovies(query, page);
      const newResults = response.Search || [];

      const results = isNewQuery
        ? newResults
        : [...searchParams.results, ...newResults];
      const hasMore = results.length < Number(response.totalResults);

      setSearchParams({ query, page, results, hasMore });
    } catch {
      Alert.alert("Error", "Failed to fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSearch = (input: string) => {
    if (input !== searchParams.query) searchMovies(input);
  };
  const onEndReached = () => {
    if (searchParams.hasMore) searchMovies(searchParams.query);
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SearchBar onSearch={onSearch} disabled={isLoading} />
        <FlatList
          data={searchParams.results}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => <MovieListItem movie={item} />}
          onEndReached={onEndReached} // Load more movies when reaching the end of the list
          onEndReachedThreshold={0.5} // Load when 50% of the list is reached
          ListFooterComponent={
            isLoading && searchParams.hasMore ? (
              <ActivityIndicator size="large" />
            ) : null
          } // Show a loading spinner at the bottom
          ListEmptyComponent={
            !isLoading && searchParams.query ? (
              <ThemedText style={styles.emptyText}>No movies found</ThemedText>
            ) : null
          }
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
    marginTop: 16,
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchScreen;
