import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { FavoritesProvider } from "@/context/favoritesContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="details/[imdbId]"
            options={({ navigation }) => ({
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="close"
                    size={24}
                    color="#fff"
                    style={{ padding: 16 }}
                  />
                </TouchableOpacity>
              ),
              headerTitle: "",
              headerTransparent: true,
              headerShadowVisible: false,
              presentation: "modal",
            })}
          />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
