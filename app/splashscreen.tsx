// app/splashscreen.tsx
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { globalStyles } from '@/styles/globalStyles';
import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {

  const theme = useColorScheme();
  const colorTheme = Colors[theme];

  return (
    <View style={[globalStyles.container, { backgroundColor: colorTheme.background }]}>
      <ActivityIndicator size="large" />
      <Text style={[globalStyles.text, { color: colorTheme.text }]}>Loading...</Text>
    </View>
  );
}
