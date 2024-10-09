import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type SearchBarProps = {
  onSearch: (query: string) => void;
  disabled?: boolean;
  lightColor?: string;
  darkColor?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  disabled = false,
  lightColor,
  darkColor,
}) => {
  const [input, setInput] = useState("");
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <TextInput
        editable={!disabled}
        style={[{ color }, styles.input]}
        placeholder="Search for movies..."
        value={input}
        onChangeText={setInput}
        onSubmitEditing={() => onSearch(input)} // Trigger search when the user presses enter
      />

      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          Keyboard.dismiss();
          onSearch(input);
        }}
        activeOpacity={0.8}
      >
        <Ionicons name={"search"} size={18} color={color} style={styles.icon} />
      </TouchableOpacity>
    </View>
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
