// styles/globalStyles.ts
import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");


export const globalStyles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  onboardingContent: {
    width: "100%",
    maxWidth: 400, // ✅ never wider than 400px
    alignItems: "center",
    paddingBottom: 0,
    margin: 0
  },

  onboardingHeaderText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 30,
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
    marginBottom: 1,
    marginTop: 20
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
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 16,
  },

  headerIconButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  headerCenterLogo: {
    height: 40,
    width: 140,
  },
  headerLogo: {
    width: width * 0.4,     // 40% of screen width (scales on large screens)
    maxWidth: 200,
    height: 50,
  },
  headerLogoLeft: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  headerLogoCenter: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  headerLogoRight: {
    position: "absolute",
    right: 16,
    width: width * 0.4,     // 40% of screen width (scales on large screens)
    maxWidth: 200,
    height: 50,
  },
  headerCenterContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroContainer: {
    flexDirection: "row",         // side-by-side layout
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#495E57",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: "column",         // side-by-side layout
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#495E57",
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },
  searchBar: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 36,                // slightly smaller height
    width: '80%',
    maxWidth: 350,
    minWidth: 200,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 0,        // removes default vertical padding
    paddingHorizontal: 10,
    justifyContent: 'center',
    elevation: 0,
    shadowColor: 'transparent',
  },

  heroTextContainer: {
    flex: 1,
    paddingRight: 15,
  },

  displayTitle: {
    fontFamily: "MarkaziText_700Bold",
    fontSize: 64,
    fontWeight: "800",
    color: "#F4CE14",             // yellow accent color
    marginBottom: 0,
    lineHeight: 50,
  },


  subTitle: {
    fontFamily: "MarkaziText_700Bold",
    fontSize: 32,
    fontWeight: "700",
    color: "#EDEFEE",
    marginTop: 4,
    marginBottom: 10,
  },

  leadText: {
    fontFamily: "Karla_400Regular",
    fontSize: 16,
    color: "#EDEFEE",
    lineHeight: 20,
    fontWeight: "400",
  },

  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 14,
    resizeMode: "cover",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#333",
    marginTop: 20,
    marginBottom: 0,
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },



  filterButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
  filterContainer: {
    flexDirection: "row",
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 18,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterButton: {
    flexDirection: "row",
    color: "black",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 18,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 30,
  },


  headerAvatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
  },
  headerAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  headerAvatarInitials: {
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
    paddingBottom: 0,
    fontSize: 16,

    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff9d6", // ✅ Soft yellow background
    width: "100%",
  },
  inputCorrection: {
    color: 'red',
    paddingTop: 0,
    fontSize: 14,

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

  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },

  menuItemTextContainer: {
    flex: 1,
    marginRight: 12,
  },

  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },

  menuItemDescription: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 20,
    marginBottom: 6,
  },

  menuItemPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: "#495E57",
  },

  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
    marginLeft: 8,
  },

});
