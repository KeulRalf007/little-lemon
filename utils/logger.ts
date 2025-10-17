// utils/logger.ts
/**
 * Universal logger usable in both Expo (React Native) and Node.
 * Usage: import { log } from './logger'; then call log('message', data);
 */

let log: (...args: any[]) => void;

try {
  // React Native / Expo (window is defined)
  if (typeof window !== "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative") {
    // Lazy require to avoid breaking Node
    const { default: RNLogs } = require("react-native-logs");

    const rnLogger = RNLogs.createLogger({
      severity: "debug",
      transportOptions: {
        colors: {
          info: "blue",
          warn: "yellow",
          error: "red",
          debug: "gray",
        },
      },
    });

    log = (...args: any[]) => {
      try {
        rnLogger.debug(...args);
      } catch (err) {
        console.log("[RNLogger Fallback]", ...args);
      }
    };
  } else {
    // Node or browser (no React Native)
    log = (...args: any[]) => {
      try {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}]`, ...args);
      } catch (err) {
        // Fallback if console fails for some reason
        process.stderr.write(`Logger error: ${(err as Error).message}\n`);
      }
    };
  }
} catch (err) {
  // If anything fails (bad require, import issues, etc.)
  log = (...args: any[]) => console.log("[SafeLogger Fallback]", ...args);
}

export { log };
