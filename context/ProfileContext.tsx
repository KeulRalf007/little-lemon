// content/ProfileContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type Profile = {
  firstName: string;
  lastName: string;
  avatarImage: string;
  email: string;
  phoneNumber: string;
  notifications: {
    orderStatus: boolean;
    passwordChanges: boolean;
    specialOffers: boolean;
    newsletter: boolean;
  };
};

type ProfileContextType = {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  loading: boolean;
};

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  setProfile: () => { },
  loading: true,
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper: ensure consistent structure & defaults
  const normalizeProfile = (data: any): Profile => ({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    avatarImage: data.avatarImage || "",
    email: data.email || "",
    phoneNumber: data.phoneNumber || data.phone || "", // support old key "phone"
    notifications: {
      orderStatus: data.notifications?.orderStatus ?? false,
      passwordChanges:
        data.notifications?.passwordChanges ??
        data.notifications?.passwordChagnes ?? // fix old typo
        false,
      specialOffers: data.notifications?.specialOffers ?? false,
      newsletter: data.notifications?.newsletter ?? false,
    },
  });

  // Load the profile once at app startup
  useEffect(() => {
    console.log("ProfileContext.tsx\\useEffect\\1.loading profile from storage...");
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("myProfile");
        if (jsonValue) {
          const storedProfile = JSON.parse(jsonValue);
          setProfile(normalizeProfile(storedProfile));
        } else {
          // Initialize with empty defaults if none exists
          setProfile(normalizeProfile({}));
        }
      } catch (e) {
        console.warn("Failed to load profile", e);
        setProfile(normalizeProfile({}));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Automatically save profile changes (only when profile changes)
  useEffect(() => {
    if (profile) {
      AsyncStorage.setItem("myProfile", JSON.stringify(profile)).catch((e) =>
        console.warn("Failed to save profile", e)
      );
    }
  }, [profile]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Convenient hook for components to use the profile
export const useProfile = () => useContext(ProfileContext);
