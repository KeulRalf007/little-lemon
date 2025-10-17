// app/index.tsx
import { Colors } from "@/constants/theme";
import { useProfile } from "@/context/ProfileContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { globalStyles } from '@/styles/globalStyles';
import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
//const Stack = createNativeStackNavigator();

export default function Index() {

  const theme = useColorScheme();
  const colorTheme = Colors[theme];
  const { profile, loading } = useProfile();

  const router = useRouter();
  const rootNavigation = useRootNavigationState(); // ensures router is ready

  // Profile state to hold the user's profile information


  const [state, setState] = useState({
    isLoading: true,
    isOnboardingCompleted: false,
  });


  // This effect only runs when at initial mount 
  useEffect(() => {
    if (loading) return;
    if (profile) {
      router.replace("/home"); // e.g., go to main app after login
    } else {
      router.replace("/onboarding");
    }
  }, [loading, profile]);





  // Show SplashScreen while loading
  return (
    <View style={[globalStyles.container, { backgroundColor: colorTheme.background }]}>
      <ActivityIndicator size="large" />
    </View>
  );

};

