// styles/globalStyles.ts
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
onboardingContainer: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  alignItems: "center",
  paddingHorizontal: 20,
  paddingTop: 60,
},

onboardingLogo: {
  width: 160,
  height: 60,
  resizeMode: "contain",
  marginBottom: 40,
},

onboardingContent: {
  width: "100%",
  maxWidth: 400, // ✅ never wider than 400px
  alignItems: "center",
},

onboardingHeaderText: {
  fontSize: 22,
  fontWeight: "600",
  color: "#333",
  marginBottom: 20,
  textAlign: "center",
},

onboardingInput: {
  width: "100%",
  maxWidth: 400,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: "#fff9d6",
  marginBottom: 12,
},

onboardingButton: {
  backgroundColor: "#495E57",
  borderRadius: 8,
  paddingVertical: 14,
  paddingHorizontal: 40,
  marginTop: 20,
  alignSelf: "center",
},

onboardingButtonText: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
},


container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  marginTop: 20,
},

  logo: {
    height: 40,
    width: 140,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },

  avatarHeaderCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    transition: "all 0.2s ease", // smooth transition when updated - web only
  },
avatarHeaderPlaceholder: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: "#E0E0E0",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#ccc",
},

avatarHeaderInitials: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#555",
},
avatarContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "90%",
  marginVertical: 20,
},

avatarCircle: {
  width: 100,
  height: 100,
  borderRadius: 50, // perfect circle
  overflow: "hidden", // ensures circular clipping
  marginRight: 20,
  borderWidth: 2,
  borderColor: "#ccc",
  backgroundColor: "#f0f0f0",
  transition: "all 0.2s ease", // smooth transition when updated - web only
},

avatar: {
  width: 80,
  height: 80,
  borderRadius: 40,
  marginRight: 20,
},

avatarPlaceholder: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: "#E0E0E0",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 20,
  borderWidth: 1,
  borderColor: "#ccc",
},

avatarInitials: {
  fontSize: 32,
  fontWeight: "bold",
  color: "#555",
},

avatarButtonsRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

  avatarButtons: {
    flexDirection: "row",
    gap: 10,
  },

changeButton: {
  backgroundColor: "#495E57",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 6,
},

changeButtonText: {
  color: "white",
  fontSize: 16,
  fontWeight: "500",
},
removeButton: {
  borderWidth: 1,
  borderColor: "#ccc",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 6,
},

removeButtonText: {
  color: "#555",
  fontSize: 16,
},
  label: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff9d6", // ✅ Soft yellow background
    width: "100%",
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },

  logoutButton: {
    backgroundColor: "#f4c542",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },

  logoutButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },

  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },

  discardButton: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  discardText: {
    color: "#333",
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: "#495E57",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },

  saveText: {
    color: "white",
    fontSize: 16,
  },
});
