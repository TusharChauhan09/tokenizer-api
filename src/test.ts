import {
  tokenize,
  replaceCommon,
  restoreCommon,
  encryptToken,
  decryptToken,
} from "./lib";

// Test the tokenizer functions
console.log("=== Testing Tokenizer Functions ===\n");

// Test 1: Basic tokenization
const testText = "hello world secret data and the";
console.log("1. Tokenization Test:");
console.log("Input:", testText);
const tokens = tokenize(testText);
console.log("Tokens:", tokens);
console.log();

// Test 2: Common word replacement
console.log("2. Common Word Replacement Test:");
console.log("Original tokens:", tokens);
const withCommon = replaceCommon(tokens);
console.log("With replacements:", withCommon);
console.log();

// Test 3: Encryption with different shifts
console.log("3. Encryption/Decryption Tests:");

const testCases = [
  { text: "Hello", shift: 3 },
  { text: "World123", shift: 5 },
  { text: "ABC", shift: 1 },
  { text: "XYZ", shift: 3 }, // Should wrap around
  { text: "789", shift: 2 }, // Should wrap digits
  { text: "Hello!", shift: 7 }, // Mixed with punctuation
];

testCases.forEach((testCase, index) => {
  console.log(
    `Test ${index + 1}: "${testCase.text}" with shift ${testCase.shift}`
  );

  const encrypted = encryptToken(testCase.text, testCase.shift);
  console.log(`  Encrypted: "${encrypted}"`);

  const decrypted = decryptToken(encrypted, testCase.shift);
  console.log(`  Decrypted: "${decrypted}"`);

  const isCorrect = decrypted === testCase.text;
  console.log(`  ✅ Correct: ${isCorrect ? "YES" : "NO"}`);

  if (!isCorrect) {
    console.log(`  ❌ Expected: "${testCase.text}", Got: "${decrypted}"`);
  }
  console.log();
});

// Test 4: Full workflow test
console.log("4. Full Workflow Test:");
const fullText = "Hello world and the data";
console.log("Original text:", fullText);

// Step 1: Tokenize
let workflowTokens = tokenize(fullText);
console.log("Step 1 - Tokens:", workflowTokens);

// Step 2: Replace common words
workflowTokens = replaceCommon(workflowTokens);
console.log("Step 2 - With common replacements:", workflowTokens);

// Step 3: Encrypt
const shift = 5;
const encryptedTokens = workflowTokens.map((t) => encryptToken(t, shift));
console.log("Step 3 - Encrypted:", encryptedTokens);

// Step 4: Decrypt
let decryptedTokens = encryptedTokens.map((t) => decryptToken(t, shift));
console.log("Step 4 - Decrypted:", decryptedTokens);

// Step 5: Restore common words
decryptedTokens = restoreCommon(decryptedTokens);
console.log("Step 5 - Restored:", decryptedTokens);

// Step 6: Join back to text
const finalText = decryptedTokens.join(" ");
console.log("Final text:", finalText);

console.log(
  `\n✅ Full workflow correct: ${finalText === fullText ? "YES" : "NO"}`
);
if (finalText !== fullText) {
  console.log(`❌ Expected: "${fullText}", Got: "${finalText}"`);
}

// Test 5: Case sensitivity test
console.log("\n5. Case Sensitivity Test:");
const caseText = "Hello hello HELLO";
console.log("Original text:", caseText);

const caseTokens = tokenize(caseText);
console.log("Tokens:", caseTokens);

const caseReplaced = replaceCommon(caseTokens);
console.log("With replacements:", caseReplaced);

const caseEncrypted = caseReplaced.map((t) => encryptToken(t, 3));
console.log("Encrypted:", caseEncrypted);

const caseDecrypted = caseEncrypted.map((t) => decryptToken(t, 3));
console.log("Decrypted:", caseDecrypted);

const caseRestored = restoreCommon(caseDecrypted);
console.log("Restored:", caseRestored);

const caseFinal = caseRestored.join(" ");
console.log("Final text:", caseFinal);

console.log(
  `✅ Case sensitivity correct: ${caseFinal === caseText ? "YES" : "NO"}`
);
if (caseFinal !== caseText) {
  console.log(`❌ Expected: "${caseText}", Got: "${caseFinal}"`);
}
