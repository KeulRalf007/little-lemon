// app/_layout.tsx
import { Colors } from "@/constants/theme";
import { ProfileProvider } from "@/context/ProfileContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Karla_400Regular, Karla_600SemiBold } from "@expo-google-fonts/karla";
import { MarkaziText_700Bold, useFonts } from "@expo-google-fonts/markazi-text";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Prevent splash screen from auto hiding before fonts load
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // ✅ All hooks must be declared unconditionally
  const [fontsLoaded] = useFonts({
    MarkaziText_700Bold,
    Karla_400Regular,
    Karla_600SemiBold,
  });

  const colorScheme = useColorScheme(); // ✅ Always called before any return

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <View />; // blank screen until fonts are loaded
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
    fonts: {
      regular: { fontFamily: "Karla_400Regular", fontWeight: "400" },
      medium: { fontFamily: "Karla_600SemiBold", fontWeight: "600" },
      bold: { fontFamily: "MarkaziText_700Bold", fontWeight: "700" },
    },
  };

  return (
    <ProfileProvider>
      <ThemeProvider value={navigationTheme}>
        <Stack screenOptions={{
          headerShown: false,
          headerTitleStyle: {
            fontFamily: "Karla_600SemiBold",
            fontSize: 18,
          },
          headerBackTitleStyle: {
            fontFamily: "Karla_400Regular",
          },
          headerTitleAlign: "center",
        }}>
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
