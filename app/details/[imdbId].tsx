import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Movie } from "@/types/movieTypes";

export default function Details() {
  const { imdbID, Title } = useLocalSearchParams<Partial<Movie>>();
  return (
    <ThemedView>
      <ThemedText>{Title}</ThemedText>
      <ThemedText>{imdbID}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
