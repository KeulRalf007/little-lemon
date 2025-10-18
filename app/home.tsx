// app/home.tsx
import { Colors } from "@/constants/theme";
import { useProfile } from "@/context/ProfileContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { globalStyles } from "@/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import debounce from 'lodash.debounce'; // Example of a default export → import without curly braces:
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Animated, FlatList, Image, Pressable, Text, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import Filter from "../components/Filter";
import { dbFilterByQueryAndCategories, dbGetMenuItems, dbSaveMenuItems, initDatabase } from "../utils/database";
import { log } from "../utils/logger";
import { wsGetData } from "../utils/webService";
/* For Debugging
export default function Home() {
  return <Text>Hello</Text>;
}
*/

export default function Home() {

  // Hooks Start -----------------------------------------------------------------------------------------------
  const theme = useColorScheme();
  const colorTheme = Colors[theme];
  const { profile, setProfile, loading } = useProfile();
  const [menuItemsData, setMenuItemsData] = React.useState<any[]>([]);

  const [savedProfile, setSavedProfile] = React.useState(profile);
  const [editableProfile, setEditableProfile] = React.useState(profile);
  // const fadeAnim = React.useRef(new Animated.Value(1)).current; remove as it might trigger "destry is not a function" error on refresh

  React.useEffect(() => setSavedProfile(profile), [profile]);
  // React.useEffect(() => profile && setEditableProfile(profile), [profile]); leads to "Uncaught TypeError: s is not a function" on Home page refresh
  React.useEffect(() => {
    if (profile) {
      setEditableProfile(profile);
    }
  }, [profile]);

  const URL_MENU_ITEMS =
    "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

  const mockup_MENU_ITEMS_FROM_URL = {
    menu: [
      {
        name: "Greek Salad",
        price: 12.99,
        description: "Our delicious salad is served with Feta cheese and peeled cucumber. Includes tomatoes, onions, olives, salt and oregano in the ingredients.",
        image: "greekSalad.jpg",
        category: "starters"
      },
      {
        name: "Bruschetta",
        price: 7.99,
        description: "Delicious grilled bread rubbed with garlic and topped with olive oil and salt. Our Bruschetta includes tomato and cheese.",
        image: "bruschetta.jpg",
        category: "starters"
      }
    ],
  };


  // Initial menu Items load -----------------------------------------------------------------------------------------------------------------------------------------
  // load menuItems from database if present, otherwise fetch from web URL and save to database
  React.useEffect(() => {
    (async () => {
      try {
        log("home.tsx\\useEffect\\test2\\1.----------------------------------")
        log("home.tsx\\useEffect\\test2\\1.Start retrieving menuItems from Database")
        await initDatabase();
        log("home.tsx\\useEffect\\test2\\1b.")
        let menuItems = await dbGetMenuItems(); // Load menu items from the database 
        log("home.tsx\\useEffect\\test2\\2.db returns menuItems length:", menuItems?.length ?? 0);

        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems?.length) {
          log("home.tsx\\useEffect\\test2\\3.no menuItems retrieved from Database, fetching from Web URL");
          menuItems = await wsGetData(URL_MENU_ITEMS); // fetch from Rest API   URL
          if (!menuItems?.length) {
            log("home.tsx\\useEffect\\test2\\4.no menuItems retrieved from Web URL");
            menuItems = []
          } else {
            await dbSaveMenuItems(menuItems); // save to database 
          }
        }
        setMenuItemsData(menuItems); // doesn't take immediate effect!

        log("home.tsx\\useEffect\\test2\\6.End menuItems first item:", menuItems[0] ?? "empty");
        log("home.tsx\\useEffect\\test2\\8.----------------------------------")

      } catch (e) {
        console.error("home.tsx\\useEffect\\19a.ERROR fetching data:");
        console.error("home.tsx\\useEffect\\19b.ERROR fetching data:", e);
        Alert.alert("home.tsx\\useEffect\\19b.ERROR fetching data:", e.message);
      }
    })();
  }, []);


  // Filter -----------------------------------------------------------------------------------------------------------------------------------------
  const filterSections = ['Starters', 'Mains', 'Desserts', 'Drinks'];
  const [filterSelections, setFilterSelections] = useState( // filterSelectons = [false, false, true] => activeCategories = ['Beverages']
    filterSections.map(() => false) // starts with [false, false, false, false]
  );
  const [dbSearchPattern, setDbSearchPattern] = useState(''); // SQL Query template
  const [searchPatternText, setSearchPatternText] = useState('') // Text displayed in Search Bar
  // callback function for Filters, set the filterSelection according to latest filter button click
  const handleFilterChange = async (index) => { // reverts the boolean value of the filterSelection at position index where the user clicked
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };
  const lookup = useCallback((q) => {
    setDbSearchPattern(q);
  }, []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
  // callback function for search bar changes
  const handleSearchPatternChange = async (newSearchPattern) => { // reverts the boolean value of the filterSelection at position index where the user clicked    
    setSearchPatternText(newSearchPattern);
    setDbSearchPattern(newSearchPattern);
    debouncedLookup(newSearchPattern)
  };
  // // update when filter button selection changes
  useEffect(() => {
    // update the section list after filter changes or search dbSearchPattern changes
    (async () => {
      log("home.tsx:useUpdateEffect.1.Start Filter or Query Change");
      const activeCategories = filterSections.filter((section, index) => {
        // If all filters are deselected, all categories are active
        // filterSelectons = [false, false, true] => activeCategories = ['Beverages']
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[index];
      });
      try {
        const menuItems = await dbFilterByQueryAndCategories( // get only those menu items matching the dbSearchPattern and active categories
          dbSearchPattern,
          activeCategories
        );
        log("home.tsx:useUpdateEffect.2.menuItems length: ", menuItems?.length);
        setMenuItemsData(menuItems)
        log("home.tsx:useUpdateEffect.3.End");
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, dbSearchPattern]);

  // Hooks End -----------------------------------------------------------------------------------------------


  if (loading || !editableProfile) return <Text>Loading...</Text>;


  // 🚪 Logout
  const logout = async () => {
    await AsyncStorage.removeItem("myProfile");
    router.replace("/onboarding");
  };


  return (
    <>
      {/* Header -----------------------------------------------------------------------------------------------*/}
      <View style={globalStyles.header}>
        <Pressable onPress={() => console.log("Left icon pressed")} style={globalStyles.headerIconButton}>
          <Image source={require("../images/Back.png")} style={globalStyles.headerLogoLeft} />
        </Pressable>

        {/* Center logo  */}
        <View style={globalStyles.headerCenterContainer}>
          <Image
            source={require("../images/Logo.png")}
            style={globalStyles.headerLogo}
            resizeMode="contain"
          />
        </View>

        {/* Right avatar */}
        {savedProfile?.avatarImage ? (
          <Pressable onPress={() => router.push("/profile")}>
            <Animated.Image
              source={{ uri: savedProfile.avatarImage }}
              style={globalStyles.headerAvatarCircle}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push("/profile")}>
            <View style={globalStyles.headerAvatarPlaceholder}>
              <Text style={globalStyles.headerAvatarInitials}>
                {(savedProfile?.firstName?.[0] || "").toUpperCase()}
                {(savedProfile?.lastName?.[0] || "").toUpperCase()}
              </Text>
            </View>
          </Pressable>
        )}
      </View>

      {/* Hero Section -----------------------------------------------------------------------------------------------*/}


      <View style={globalStyles.heroContainer}>
        <View style={globalStyles.heroTextContainer}>
          <Text style={globalStyles.displayTitle}>Little Lemon</Text>
          <Text style={globalStyles.subTitle}>Chicago</Text>
          <Text style={globalStyles.leadText}>
            We are a family owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </Text>

        </View>

        <Image
          source={require("@/images/Hero image.png")}
          style={globalStyles.heroImage}
        />
      </View>

      <View style={globalStyles.searchContainer}>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#555"
          onChangeText={handleSearchPatternChange}
          value={searchPatternText}
          style={globalStyles.searchBar}
          iconColor="#555"
          inputStyle={{
            color: 'black',
            fontSize: 14,
            paddingBottom: 0,
            paddingTop: 0,
            marginTop: -2,           // 👈 nudges text up slightly (key adjustment)
            textAlignVertical: 'center',
            justifyContent: 'center',
          }}
          elevation={0}
        />
      </View>
      {/* Filter Section -----------------------------------------------------------------------------------------------*/}
      <View>
        <Text style={globalStyles.sectionTitle}>Order for delivery!</Text>
        <Filter onChange={handleFilterChange} selections={filterSelections} sections={filterSections} />
      </View>

      {/* Menu Item List -----------------------------------------------------------------------------------------------*/}

      <FlatList
        data={menuItemsData}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          < View style={globalStyles.menuItemContainer} key={item.uuid}>
            <View style={globalStyles.menuItemTextContainer}>
              <Text style={globalStyles.menuItemTitle}>{item.name}</Text>
              <Text numberOfLines={2}
                elipsizeModel="tail"
                style={globalStyles.menuItemDescription}>{item.description}</Text>
              <Text style={globalStyles.menuItemPrice}>${item.price}</Text>
            </View>
            {/*<Text style={globalStyles.menuItemPrice}>{`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`}</Text>*/}
            <Image
              source={{
                uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
              }}
              style={globalStyles.menuItemImage}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.container}
      />


    </>
  );
}
