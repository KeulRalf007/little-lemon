// tests/test.tsx.tsx
import React, { useEffect } from "react";
import { Text } from "react-native";
import { createTable, getMenuItems, saveMenuItems } from "../utils/database";
import { log } from "../utils/logger";
import { fetchData } from "../utils/webService";

export default function Test() {

    log("test.tsx\\1.Start")

    // --- Define which test blocks to execute ---
    const testFlags = [1, 2]; // ✅ choose which test blocks to run

    // --- Helper to check if a test block is enabled ---
    const isEnabled = (n: number) => testFlags.includes(n);

    // --- Individual test blocks (self-contained, async) ---

    /* TEST FETCH DATA
      async function testFetchData() {
        log("testFetchData() 1.Start");
    
        const API_URL =
          "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
    
        try {
          const menu = await fetchData(API_URL);
          log("testFetchData() 2.Fetched items: " + menu.length);
          log("testFetchData() 3.First item: " + JSON.stringify(menu[0], null, 2));
        } catch (err) {
          console.error("testFetchData() 4.Error:", err);
        }
    
        log("testFetchData() 5.End");
      }
    
      testFetchData();
      log("testMaster() End");
    */

    // Test fetchData from Web URL
    const test1 = async () => {
        try {
            log("test.tsx\\useEffect\\test1\\1.----------------------------------")
            log("test.tsx\\useEffect\\test1\\1.Start fetchData from Web URL")

            const API_URL =
                "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

            const menuItems = await fetchData(API_URL);
            log("test.tsx\\useEffect\\test1\\2.URL returns menuItems length:", menuItems?.length ?? 0);
            log("test.tsx\\useEffect\\test1\\3.First Item:", JSON.stringify(menuItems[0], null, 2));

        } catch (e) {
            // Handle error
            log("test.tsx\\useEffect\\test1\\10.Error");
            log(e.message);
        }
        log("test.tsx\\useEffect\\test1\\90.After try and catch");
        log("test.tsx\\useEffect\\test1\\90.------------------------------------");
    }

    // Test Database
    const test2 = async () => {
        try {
            log("test.tsx\\useEffect\\test2\\1.----------------------------------")
            log("test.tsx\\useEffect\\test2\\1.Start testing Database functions")
            await createTable(); // create table on database if not existing
            let menuItems = await getMenuItems(); // Load menu items from the database 
            log("test.tsx\\useEffect\\test2\\3.db returns menuItems length:", menuItems?.length ?? 0);

            // The application only fetches the menu data once from a remote URL
            // and then stores it into a SQLite database.
            // After that, every application restart loads the menu from the database
            if (!menuItems.length) {
                //const menuItems = await fetchData(); // fetch from Rest API   URL
                const menuItems = [{ uuid: "1", title: "Greek Salad", price: "12.99", category: "Salad" }]
                log("test.tsx\\useEffect\\test2\\4.menuItems before db saving mockup data");
                await saveMenuItems(menuItems); // save menu items to database
                log("test.tsx\\useEffect\\test2\\5.menuItems after db saving mockup data");
            }

            log("test.tsx\\useEffect\\test2\\6.mmenuItems first item:", menuItems[0] ?? "empty");

        } catch (e) {
            // Handle error
            log("test.tsx\\useEffect\\test2\\10.Error");
            log(e.message);
        }
        log("test.tsx\\useEffect\\test2\\90.After try and catch");
        log("test.tsx\\useEffect\\test2\\90.------------------------------------");
    }





    // main test runner
    useEffect(() => {
        (async () => {
            log("test.tsx\\useEffect\\0.Start running selected tests");

            try {
                if (isEnabled(1)) await test1();
                if (isEnabled(2)) await test2();
                if (isEnabled(3)) await test3();
                if (isEnabled(4)) await test4();
                if (isEnabled(5)) await test5();
            } catch (e: any) {
                log("test.tsx\\useEffect\\90.Error:", e?.message ?? e ?? "unknown error");
            }

            log("test.tsx\\useEffect\\99.End");
        })();
    }, []);



    return <>
        <Text>   Inside test.tsx</Text>
        <Text>   Active test blocks: {JSON.stringify(testFlags)}</Text>
        <Text>   Press F12 to watch log messages</Text>
    </>
}
