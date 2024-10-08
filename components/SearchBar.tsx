import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  lightColor?: string;
  darkColor?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  lightColor,
  darkColor,
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <ThemedView style={[styles.container, { borderColor: color }]}>
      <TextInput
        style={[{ color }, styles.input]}
        placeholder="Search for movies..."
        value={query}
        onChangeText={onQueryChange}
        onSubmitEditing={onSearch} // Trigger search when the user presses enter
      />

      <TouchableOpacity onPress={onSearch} activeOpacity={0.8}>
        <Ionicons name={"search"} size={18} color={color} style={styles.icon} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 25,
    borderWidth: 1,
    padding: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginRight: 8,
  },
  icon: { padding: 8 },
});

export default SearchBar;
