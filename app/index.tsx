// app/index.tsx
import { Colors } from "@/constants/theme";
import { useProfile } from "@/context/ProfileContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { globalStyles } from '@/styles/globalStyles';
import { useRootNavigationState, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { log } from "../utils/logger";
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
    log("Index.tsx:useEffect:1.Start")
    if (loading) return;
    log("Index.tsx:useEffect:2.Profile", profile)
    log("Index.tsx:useEffect:3.Profile.firstName", profile?.firstName)
    log("Index.tsx:useEffect:4.Profile.email", profile?.email)
    if (profile?.firstName && profile?.email) {
      log("Index.tsx:useEffect:5a. GO TO HOME")
      router.replace("/home"); // e.g., go to main app after login
    } else {
      log("Index.tsx:useEffect:5b. GO TO onboarding")
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

