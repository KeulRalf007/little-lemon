// Universal ESM test runner (cross-platform)
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import 'ts-node/esm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read test file argument (relative to project root)
const argPath = process.argv[2];
const defaultTest = './utils/testMaster.ts';

// Resolve full filesystem path
const targetPath = path.resolve(__dirname, argPath || defaultTest);

// ✅ Convert it to a proper file:// URL (required for Windows)
const targetUrl = pathToFileURL(targetPath).href;

console.log(`🧪 Running test file: ${targetUrl}\n`);

try {
  await import(targetUrl);
} catch (err) {
  console.error('❌ Error importing test file:', err);
  process.exit(1);
}
