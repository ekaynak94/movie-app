import { Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Movie } from "@/types/movieTypes";

export default function Details() {
  const { imdbID, Title, Poster } = useLocalSearchParams<Partial<Movie>>();
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
        <ThemedText>{Title}</ThemedText>
        <ThemedText>{imdbID}</ThemedText>
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
});
