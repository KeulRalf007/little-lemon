	// utils/logger.ts
	// Only use .tsx for files containing JSX/React components.
	// Use .ts for plain TypeScript utilities, like logger, database, or helpers.
	// In order to test JS/TS logic outside Expo, not Expo APIs, you can make your logger work in Node outside expo by conditionally importing:
let log: any;

try {
  // Works inside Expo / React Native
  const { default: logger } = require('react-native-logs');
  log = logger.createLogger({
    severity: 'debug',
    transportOptions: {
      colors: {
        info: 'blue',
        warn: 'yellow',
        error: 'red',
        debug: 'gray',
      },
    },
  });
} catch (e) {
  // Fallback for Node environment
  log = console.log;
}

export { log };

