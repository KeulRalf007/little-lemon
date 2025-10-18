// utils/database.tsx
// Unified database layer for Android, iOS, and Web
// Uses expo-sqlite for native, Dexie (IndexedDB) for web

import Dexie from "dexie";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { log } from "./logger";

// ---------------------
// Shared table definition
// ---------------------

export type MenuItem = {
    uuid: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
};

// ---------------------
// Web (Dexie) Setup
// ---------------------

let dexieDb: Dexie | null = null;

function initDexie() {
    const db = new Dexie("little_lemon_web");
    db.version(1).stores({
        menuitems: "++id, uuid, name, price, description, image, category",
    });
    dexieDb = db;
    log("database.tsx:web:initDexie - IndexedDB initialized");
}

// ---------------------
// Native (SQLite) Setup
// ---------------------

let sqliteDb: SQLite.SQLiteDatabase | null = null;

async function initSQLite() {
    const db = await SQLite.openDatabaseAsync("little_lemon.db");
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT,
      name TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
    sqliteDb = db;
    log("database.tsx:native:initSQLite - SQLite DB initialized");
}

// ---------------------
// Initialize (once)
// ---------------------

export async function initDatabase() {
    if (Platform.OS === "web") {
        if (!dexieDb) initDexie();
    } else {
        if (!sqliteDb) await initSQLite();
    }
}

// ---------------------
// Save Menu Items
// ---------------------

export async function dbSaveMenuItems(menuItems: MenuItem[]): Promise<void> {
    if (!menuItems?.length) return;

    log(`database.tsx:dbSaveMenuItems - Saving ${menuItems.length} items...`);

    if (Platform.OS === "web") {
        if (!dexieDb) initDexie();
        const db = dexieDb as Dexie;
        await (db.table("menuitems") as Dexie.Table<MenuItem, number>).clear();
        await (db.table("menuitems") as Dexie.Table<MenuItem, number>).bulkAdd(menuItems);
        log("database.tsx:web:dbSaveMenuItems - Saved items to IndexedDB");
    } else {
        if (!sqliteDb) await initSQLite();
        const db = sqliteDb as SQLite.SQLiteDatabase;
        await db.execAsync("DELETE FROM menuitems;");
        const placeholders = menuItems.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
        const params = menuItems.flatMap((item) => [
            item.uuid,
            item.name,
            item.price,
            item.description,
            item.image,
            item.category,
        ]);
        await db.runAsync(
            `INSERT INTO menuitems (uuid, name, price, description, image, category) VALUES ${placeholders};`,
            params
        );
        log("database.tsx:native:dbSaveMenuItems - Saved items to SQLite");
    }
}

// ---------------------
// Get Menu Items
// ---------------------

export async function dbGetMenuItems(): Promise<MenuItem[]> {
    if (Platform.OS === "web") {
        if (!dexieDb) initDexie();
        const db = dexieDb as Dexie;
        const items = await (db.table("menuitems") as Dexie.Table<MenuItem, number>).toArray();
        log(`database.tsx:web:dbGetMenuItems - Loaded ${items.length} items`);
        return items;
    } else {
        if (!sqliteDb) await initSQLite();
        const db = sqliteDb as SQLite.SQLiteDatabase;
        const result = await db.getAllAsync<MenuItem>("SELECT * FROM menuitems;");
        log(`database.tsx:native:dbGetMenuItems - Loaded ${result.length} items`);
        return result;
    }
}

// ---------------------
// Filter by searchPattern + categories
// ---------------------

export async function dbFilterByQueryAndCategories(
    searchPattern: string,
    activeCategories: string[]
): Promise<MenuItem[]> {
    log(`database.tsx:dbFilterByQueryAndCategories:1a.Start`);
    log(`database.tsx:dbFilterByQueryAndCategories:1b.searchPattern`, searchPattern);
    log(`database.tsx:dbFilterByQueryAndCategories:1c.activeCategories`, activeCategories);
    const whereClauses: string[] = [];
    const params: (string | number)[] = [];

    if (searchPattern?.trim()) {
        whereClauses.push("name LIKE ?");
        params.push(`%${searchPattern.trim()}%`);
    }

    if (activeCategories?.length > 0) {
        activeCategories = activeCategories.map((cat) => cat.toLowerCase())
        const placeholders = activeCategories.map(() => "?").join(", ");
        whereClauses.push(`category IN (${placeholders})`);
        params.push(...activeCategories);
    }

    if (Platform.OS === "web") {
        log(`database.tsx:dbFilterByQueryAndCategories:2w.Web Platform`);
        if (!dexieDb) initDexie();
        const db = dexieDb as Dexie;
        let items = await (db.table("menuitems") as Dexie.Table<MenuItem, number>).toArray();
        log(`database.tsx:dbFilterByQueryAndCategories:3w. items.length after unfiltered load`, items?.length);

        if (searchPattern.trim()) {
            items = items.filter((item) =>
                item.name.toLowerCase().includes(searchPattern.trim().toLowerCase())
            );
        }
        log(`database.tsx:dbFilterByQueryAndCategories:4w. items.length after searchPattern`, items?.length);
        if (activeCategories?.length) {
            const lowerActiveCategories = activeCategories.map(cat => cat.toLowerCase());
            items = items.filter((item) =>
                lowerActiveCategories.includes(item.category.toLowerCase())
            );
        }


        log(`database.tsx:web:dbFilterByQueryAndCategories:5w. items.length after active Categories`, items?.length);
        return items;
    } else {
        log(`database.tsx:dbFilterByQueryAndCategories:2ai.Android or iOS Platform`);
        if (!sqliteDb) await initSQLite();
        log(`database.tsx:dbFilterByQueryAndCategories:3ai.`);
        const db = sqliteDb as SQLite.SQLiteDatabase;
        log(`database.tsx:dbFilterByQueryAndCategories:4ai.`);
        log(`database.tsx:dbFilterByQueryAndCategories:4ai. activeCategories: `, activeCategories);
        log(`database.tsx:dbFilterByQueryAndCategories:4ai. whereClauses: `, whereClauses);
        const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
        log(`database.tsx:dbFilterByQueryAndCategories:5ai. whereSQL: `, whereSQL);
        const sql = `SELECT * FROM menuitems ${whereSQL}; `;
        log(`database.tsx:dbFilterByQueryAndCategories:6ai.sql: ${sql}`);
        log(`database.tsx:dbFilterByQueryAndCategories:6ai.params: ${params}`);
        const result = await db.getAllAsync<MenuItem>(sql, ...params);
        log(`database.tsx:dbFilterByQueryAndCategories:7ai.End result.lenght: ${result.length}`);
        return result;
    }
}

// ---------------------
// Delete All Menu Items
// ---------------------

export async function dbDeleteTable(): Promise<void> {
    if (Platform.OS === "web") {
        if (!dexieDb) initDexie();
        const db = dexieDb as Dexie;
        await (db.table("menuitems") as Dexie.Table<MenuItem, number>).clear();
        log("database.tsx:web:dbDeleteTable - Cleared IndexedDB");
    } else {
        if (!sqliteDb) await initSQLite();
        const db = sqliteDb as SQLite.SQLiteDatabase;
        await db.execAsync("DELETE FROM menuitems;");
        log("database.tsx:native:dbDeleteTable - Cleared SQLite");
    }
}
