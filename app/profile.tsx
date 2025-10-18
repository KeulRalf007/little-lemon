// app/profile.tsx
import { Colors } from "@/constants/theme";
import { useProfile } from "@/context/ProfileContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { globalStyles } from "@/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React from "react";
import { Alert, Animated, Image, Platform, Pressable, ScrollView, Switch, Text, TextInput, ToastAndroid, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { dbDeleteTable } from "../utils/database";
import { validateEmail, validateNonEmptyString } from '../utils/validateEmail';


export default function Profile() {
  // Hooks Start ----------------------------------------------------------------------------------
  const theme = useColorScheme();
  const colorTheme = Colors[theme];
  const { profile, setProfile, loading } = useProfile();

  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');



  const [savedProfile, setSavedProfile] = React.useState(profile);
  // Local editable copy
  // That means profile (global) = saved data,
  // and editableProfile (local) = current form state.
  const [editableProfile, setEditableProfile] = React.useState(profile);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  // 🟡 Keep local copy of saved global profile in sync
  React.useEffect(() => {
    if (profile && profile !== editableProfile) {
      setSavedProfile(profile);
      setEditableProfile(profile);
    }
  }, [profile]);


  const animateAvatar = () => {
    // fade out quickly, then back in
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Hooks End ----------------------------------------------------------------------------------

  if (loading || !editableProfile) return <Text>Loading...</Text>;

  // 🔁 Handle discard changes
  const discardChanges = async () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Discard changes? Any unsaved changes will be lost.");
      if (!confirmed) return;
      const stored = await AsyncStorage.getItem("myProfile");
      if (stored) {
        const saved = JSON.parse(stored);
        setEditableProfile(saved);
        setProfile(saved); // sync global
        console.log("Profile changes discarded (web).");
      }
      return;
    }

    Alert.alert("Discard changes?", "Any unsaved changes will be lost.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Discard",
        style: "destructive",
        onPress: async () => {
          const stored = await AsyncStorage.getItem("myProfile");
          if (stored) {
            const saved = JSON.parse(stored);
            setEditableProfile(saved);
            setProfile(saved);
            console.log("Profile changes discarded (native).");
          }
        },
      },
    ]);
  };


  const saveChanges = async () => {
    const digits = (editableProfile.phoneNumber || "").replace(/\D/g, "");
    if ((digits.trim().length !== 0) && digits.length !== 10) {
      alert("Please enter a valid 10-digit U.S. phone number.");
      return;
    }

    await AsyncStorage.setItem("myProfile", JSON.stringify(editableProfile));
    setProfile(editableProfile);
    animateAvatar(); // fade header avatar when it updates
    if (Platform.OS === "android") {
      ToastAndroid.show("Profile saved", ToastAndroid.SHORT);
    } else {
      alert("Profile saved");
    }
  };

  // 🚪 Logout
  const logout = async () => {
    dbDeleteTable(); // clear database
    await AsyncStorage.removeItem("myProfile");
    router.replace("/onboarding");
  };

  return (

    <ScrollView contentContainerStyle={globalStyles.container}
      keyboardShouldPersistTaps="handled">

      {/* Header */}
      <View style={globalStyles.header}>
        {/* Left back icon */}
        <Pressable onPress={() => router.back()} >
          <Image
            source={require("../images/Back.png")}
            style={globalStyles.headerLogoLeft}
            resizeMode="contain"
          />
        </Pressable>
        {/* Center lemon logo */}
        <View style={globalStyles.headerCenterContainer}>
          <Image
            source={require("../images/Logo.png")}
            style={globalStyles.headerLogoCenter}
            resizeMode="contain"
          />
        </View>

        {/* Top-right Avatar */}
        {savedProfile?.avatarImage ? (
          <Animated.Image
            source={{ uri: savedProfile.avatarImage }}
            style={globalStyles.headerAvatarCircle}
          />
        ) : (
          <View style={globalStyles.headerAvatarPlaceholder}>
            <Text style={globalStyles.headerAvatarInitials}>
              {(savedProfile?.firstName?.[0] || "").toUpperCase()}
              {(savedProfile?.lastName?.[0] || "").toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <Text style={globalStyles.title}>Personal information</Text>


      {/* Avatar */}
      <View style={globalStyles.avatarContainer}>
        {editableProfile.avatarImage ? (
          <Animated.Image
            source={{ uri: editableProfile.avatarImage }}
            style={globalStyles.avatarCircle}
          />
        ) : (
          <View style={globalStyles.avatarPlaceholder}>
            <Text style={globalStyles.avatarInitials}>
              {(editableProfile.firstName?.[0] || "").toUpperCase()}
              {(editableProfile.lastName?.[0] || "").toUpperCase()}
            </Text>
          </View>
        )}

        <View style={globalStyles.avatarButtonsRow}>
          <Pressable
            style={globalStyles.changeButton}
            onPress={async () => {
              const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (!permissionResult.granted) {
                alert("Permission to access the gallery is required!");
                return;
              }

              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1], // 🟡 force 1:1 aspect ratio
                quality: 0.9,
              });

              if (!result.canceled) {
                const uri = result.assets[0].uri;
                setEditableProfile({ ...editableProfile, avatarImage: uri });
                animateAvatar(); // ✅ run smooth fade animation
              }
            }}
          >
            <Text style={globalStyles.changeButtonText}>Change</Text>
          </Pressable>

          <Pressable
            style={globalStyles.removeButton}
            onPress={() =>
              setEditableProfile({ ...editableProfile, avatarImage: "" })
            }
          >
            <Text style={globalStyles.removeButtonText}>Remove</Text>
          </Pressable>
        </View>
      </View>



      {/* Form Fields */}
      <Text style={globalStyles.label}>First name *</Text>
      <TextInput
        style={globalStyles.input}
        value={editableProfile.firstName || ""}
        placeholder="First name"
        placeholderTextColor="#888"
        onChangeText={(text) =>
          setEditableProfile({ ...editableProfile, firstName: text })
        }
      />
      <Text style={globalStyles.inputCorrection}>
        {editableProfile.firstName && !validateNonEmptyString(editableProfile.firstName)
          ? "Use alphabetical letters, not numbers or special characters"
          : ""}
      </Text>


      <Text style={globalStyles.label}>Last name</Text>
      <TextInput
        style={globalStyles.input}
        value={editableProfile.lastName || ""}
        placeholder="Last name"
        placeholderTextColor="#888"
        onChangeText={(text) =>
          setEditableProfile({ ...editableProfile, lastName: text })
        }
      />

      <Text style={globalStyles.label}>Email *</Text>
      <TextInput
        style={globalStyles.input}
        value={editableProfile.email || ""}
        placeholder="Email"
        placeholderTextColor="#888"
        onChangeText={(text) =>
          setEditableProfile({ ...editableProfile, email: text })
        }
      />
      <Text style={globalStyles.inputCorrection}>
        {editableProfile.email && !validateEmail(editableProfile.email) ? "Use valid Email Addresses" : ""}
      </Text>

      <Text style={globalStyles.label}>Phone number</Text>
      <MaskedTextInput
        mask="(999) 999-9999"
        keyboardType="numeric"
        style={globalStyles.input}
        placeholder="(555) 123-4567"
        placeholderTextColor="#888"
        value={editableProfile.phoneNumber || ""}
        onChangeText={(formatted, extracted) => {
          const newValue = !extracted
            ? ""
            : extracted.length <= 10
              ? formatted
              : editableProfile.phoneNumber;

          if (editableProfile.phoneNumber !== newValue) {
            setEditableProfile({ ...editableProfile, phoneNumber: newValue });
          }
        }}
      />
      <Text style={globalStyles.inputCorrection}>
        {!(editableProfile.phoneNumber?.trim() === "" || editableProfile.phoneNumber?.replace(/\D/g, "").length === 10) ? "Use valid 10 digit phone number" : ""}
      </Text>

      {/* Notifications */}
      <Text style={globalStyles.title}>Email notifications</Text>
      {[
        { key: "orderStatus", label: "Order status" },
        { key: "passwordChanges", label: "Password changes" },
        { key: "specialOffers", label: "Special offers" },
        { key: "newsletter", label: "Newsletter" },
      ].map((item) => (
        <View key={item.key} style={globalStyles.switchRow}>
          <Switch
            value={
              editableProfile.notifications?.[
              item.key as keyof typeof editableProfile.notifications
              ] || false
            }
            onValueChange={(value) =>
              setEditableProfile({
                ...editableProfile,
                notifications: {
                  ...editableProfile.notifications,
                  [item.key]: value,
                },
              })
            }
          />
          <Text style={globalStyles.switchLabel}>{item.label}</Text>
        </View>
      ))}

      {/* Buttons */}

      <View style={globalStyles.footerButtons}>
        <Pressable style={globalStyles.discardButton} onPress={discardChanges}>
          <Text style={globalStyles.discardText}>Discard changes</Text>
        </Pressable>

        <Pressable style={[globalStyles.saveButton, {
          backgroundColor:
            validateNonEmptyString(editableProfile.firstName) && validateEmail(editableProfile.email) &&
              (
                editableProfile.phoneNumber?.trim() === "" ||
                editableProfile.phoneNumber?.replace(/\D/g, "").length === 10
              )
              ? "#495E57"
              : "#B7B7B7",
        }]}
          onPress={saveChanges}
          disabled={!(validateNonEmptyString(editableProfile.firstName) && validateEmail(editableProfile.email) && (editableProfile.phoneNumber?.trim() === "" || editableProfile.phoneNumber?.replace(/\D/g, "").length === 10))}>
          <Text style={globalStyles.saveText}>Save changes</Text>
        </Pressable>
      </View>


      <Pressable style={globalStyles.logoutButton} onPress={logout}>
        <Text style={globalStyles.logoutButtonText}>Log out</Text>
      </Pressable>


    </ScrollView >
  );
}
