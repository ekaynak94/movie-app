import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface MovieListItemProps {
  title: string;
  posterUrl: string;
  onPress: () => void;
}

const MovieListItem: React.FC<MovieListItemProps> = ({
  title,
  posterUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{ uri: posterUrl }}
        style={styles.imageBackground}
        imageStyle={styles.image} // To style the image itself
      >
        <View style={styles.overlay}>
          <ThemedText type="title">{title}</ThemedText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
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
