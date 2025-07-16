import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read input word list
const wordListPath = path.join(__dirname, "all-words.txt");
const words = fs.readFileSync(wordListPath, "utf-8").split(/\r?\n/);

// Regex to match only lowercase alphabetic words
const validWordRegex = /^[a-z]+$/;

const grouped = {};

for (const word of words) {
  const trimmed = word.trim();

  // Skip empty lines and invalid words
  if (!trimmed || !validWordRegex.test(trimmed)) continue;

  const len = trimmed.length;
  if (!grouped[len]) grouped[len] = new Set();
  grouped[len].add(trimmed); // no toLowerCase needed — already lowercase-only
}

// Create output folder
const outputDir = path.join(__dirname, "output");
fs.mkdirSync(outputDir, { recursive: true });

// Write to JSON files
for (const len in grouped) {
  const wordArray = Array.from(grouped[len]);
  const filePath = path.join(outputDir, `words-${len}.json`);
  fs.writeFileSync(filePath, JSON.stringify(wordArray, null, 2), "utf-8");
  console.log(`✅ Created: words-${len}.json (${wordArray.length} words)`);
}