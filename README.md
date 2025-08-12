# Tokenizer API

A powerful text tokenization, encoding, and decoding API built with Node.js and TypeScript. This API breaks down sentences into tokens, applies common word compression, and uses Caesar cipher encryption for secure text processing.

## 🚀 Features

- **Text Tokenization**: Break sentences into individual tokens
- **Common Word Compression**: Replace frequent words with shorter codes
- **Case Sensitivity**: Treats "Hello" and "hello" as different tokens
- **Caesar Cipher Encryption**: Secure encryption with modulo operations
- **Round-trip Processing**: Full encoding and decoding workflow

## 📋 API Endpoints

### 1. **POST `/tokens` - Tokenize Sentence**

Breaks a sentence into individual tokens.

**Request:**

```json
{
  "sentence": "Hello world and the data"
}
```

**Response:**

```json
{
  "success": true,
  "sentence": "Hello world and the data",
  "tokens": ["Hello", "world", "and", "the", "data"],
  "totalTokens": 5
}
```

**Use Case:** Start the tokenization process by breaking your text into manageable pieces.

---

### 2. **POST `/encode` - Encode Tokens**

Takes tokens and applies common word compression followed by Caesar cipher encryption.

**Request:**

```json
{
  "tokens": ["Hello", "world", "and", "the", "data"],
  "shift": 5
}
```

**Response:**

```json
{
  "success": true,
  "originalTokens": ["Hello", "world", "and", "the", "data"],
  "withCommonWords": ["#3A", "#4", "#2", "#1", "#5"],
  "encodedTokens": ["#8F", "#9", "#7", "#6", "#0"],
  "shift": 5
}
```

**Parameters:**

- `tokens`: Array of strings to encode
- `shift`: Caesar cipher shift value (default: 5)

**Process:**

1. Replace common words with codes (Hello → #3A)
2. Apply Caesar cipher encryption (#3A → #8F)

---

### 3. **POST `/decode` - Decode Tokens**

Decrypts encoded tokens and restores original words.

**Request:**

```json
{
  "encodedTokens": ["#8F", "#9", "#7", "#6", "#0"],
  "shift": 5
}
```

**Response:**

```json
{
  "success": true,
  "encodedTokens": ["#8F", "#9", "#7", "#6", "#0"],
  "decryptedTokens": ["#3A", "#4", "#2", "#1", "#5"],
  "restoredTokens": ["Hello", "world", "and", "the", "data"],
  "decodedSentence": "Hello world and the data",
  "shift": 5
}
```

**Parameters:**

- `encodedTokens`: Array of encrypted tokens
- `shift`: Caesar cipher shift value (must match encoding shift)

**Process:**

1. Decrypt Caesar cipher (#8F → #3A)
2. Restore common words (#3A → Hello)
3. Join tokens back into sentence

---

## 🔧 Common Word Mappings

The API uses case-sensitive common word compression:

| Word  | Code | Word  | Code |
| ----- | ---- | ----- | ---- |
| the   | #1   | The   | #1A  |
| and   | #2   | And   | #2A  |
| hello | #3   | Hello | #3A  |
| world | #4   | World | #4A  |
| data  | #5   | Data  | #5A  |

## 🛡️ Encryption Details

**Caesar Cipher with Modulo Operations:**

- **Letters**: Wrap within A-Z and a-z ranges
- **Numbers**: Wrap within 0-9 range
- **Special chars**: Remain unchanged
- **Case preservation**: Maintains original capitalization

**Example:**

- 'Z' + shift 3 → 'C' (wraps around)
- '9' + shift 2 → '1' (wraps around)

## 📝 Complete Workflow Example

### Step 1: Tokenize

```bash
curl -X POST http://localhost:3000/tokens \
  -H "Content-Type: application/json" \
  -d '{"sentence": "Hello world and the data"}'
```

### Step 2: Encode

```bash
curl -X POST http://localhost:3000/encode \
  -H "Content-Type: application/json" \
  -d '{"tokens": ["Hello", "world", "and", "the", "data"], "shift": 5}'
```

### Step 3: Decode

```bash
curl -X POST http://localhost:3000/decode \
  -H "Content-Type: application/json" \
  -d '{"encodedTokens": ["#8F", "#9", "#7", "#6", "#0"], "shift": 5}'
```

## 🚨 Error Handling

All endpoints return appropriate HTTP status codes:

- **400 Bad Request**: Invalid input parameters
- **500 Internal Server Error**: Server processing errors

**Example Error Response:**

```json
{
  "error": "Sentence is required and must be a string"
}
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── controller.token.ts    # API endpoints
│   ├── routes/
│   │   └── route.token.ts         # Route definitions
│   ├── lib.ts                     # Core tokenization logic
│   ├── test.ts                    # Test functions
│   └── server.ts                  # Express server
├── package.json
└── tsconfig.json
```

## 🔄 Key Features

1. **Case Sensitive**: "Hello" ≠ "hello" - each gets different codes
2. **Modular Design**: Separate tokenization, encoding, and decoding steps
3. **Secure Encryption**: Caesar cipher with proper character wrapping
4. **Round-trip Safe**: Text → Tokens → Encoded → Decoded → Original Text
5. **Extensible**: Easy to add new common words or change encryption methods

## 🧪 Testing

Run the test suite to verify all functions:

```bash
npx ts-node src/test.ts
```

This will test:

- Basic tokenization
- Common word replacement
- Encryption/decryption with various shifts
- Full workflow round-trip
- Case sensitivity handling

## 📞 API Usage Tips

1. **Always use the same shift value** for encoding and decoding
2. **Preserve the exact token array** when moving between steps
3. **Case matters** - "Hello" and "hello" are treated differently
4. **Shift range** - Use values 1-25 for best results with letters

---

Built with ❤️ using Node.js, Express.js, and TypeScript
