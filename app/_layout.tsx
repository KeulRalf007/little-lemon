// app/_layout.tsx
import { Colors } from "@/constants/theme";
import { ProfileProvider } from "@/context/ProfileContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Karla_400Regular, Karla_600SemiBold } from "@expo-google-fonts/karla";
import { MarkaziText_700Bold, useFonts } from "@expo-google-fonts/markazi-text";
import { ThemeProvider } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  // ✅ All hooks must be declared unconditionally
  const [fontsLoaded] = useFonts({
    MarkaziText_700Bold,
    Karla_400Regular,
    Karla_600SemiBold,
  });

  const colorScheme = useColorScheme(); // ✅ Always called before any return

  // ✅ Now it's safe to conditionally render UI
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigationTheme = {
    dark: colorScheme === "dark",
    colors: {
      background: Colors[colorScheme].background,
      text: Colors[colorScheme].text,
      primary: Colors[colorScheme].tint,
      card: Colors[colorScheme].background,
      border: Colors[colorScheme].icon,
      notification: Colors[colorScheme].tabIconSelected,
    },
  };

  return (
    <ProfileProvider>
      <ThemeProvider value={navigationTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="splashscreen" options={{ headerShown: false }} />
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
          <Stack.Screen name="test" options={{ headerShown: false }} />
        </Stack>

        <StatusBar
          style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor={Colors[colorScheme].background}
        />
      </ThemeProvider>
    </ProfileProvider>
  );
}
