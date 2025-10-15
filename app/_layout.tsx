import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from "@/constants/theme"; // ✅ Expo’s built-in color palette
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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
    <ProfileProvider> {/* mounted once and covers every page of the app} */}
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="splashscreen" options={{headerShown: false}}/>
        <Stack.Screen name="onboarding" options={{headerShown: false}}/>
        <Stack.Screen name="profile" options={{headerShown: false}}/>
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"}
          backgroundColor={Colors[colorScheme].background} />
    </ThemeProvider>
    </ProfileProvider>
  );
}
