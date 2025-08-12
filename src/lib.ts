export const commonMap = {
  the: "#1",
  The: "#1A",
  and: "#2",
  And: "#2A",
  hello: "#3",
  Hello: "#3A",
  world: "#4",
  World: "#4A",
  data: "#5",
  Data: "#5A",
};
// any other common words dataset

export const reverseCommonMap = Object.fromEntries(
  Object.entries(commonMap).map(([word, code]) => [code, word])
);

export function tokenize(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

export function replaceCommon(tokens: string[]): string[] {
  return tokens.map((token) => {
    const code = commonMap[token as keyof typeof commonMap];

    if (code) {
      return code;
    }

    return token;
  });
}

export function restoreCommon(tokens: string[]): string[] {
  return tokens.map((token) => {
    return reverseCommonMap[token] || token;
  });
}

export function encryptToken(token: string, shift: number = 3): string {
  return token
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      } else if (code >= 48 && code <= 57) {
        return String.fromCharCode(((code - 48 + shift) % 10) + 48);
      } else {
        return char;
      }
    })
    .join("");
}

export function decryptToken(encrypted: string, shift: number = 3): string {
  return encrypted
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      } else if (code >= 48 && code <= 57) {
        return String.fromCharCode(((code - 48 - shift + 10) % 10) + 48);
      } else {
        return char;
      }
    })
    .join("");
}

export function getTokenType(token: string): string {
  if (/^[A-Z][a-z]*$/.test(token)) return "Capitalized";
  if (/^[a-z]+$/.test(token)) return "Lowercase";
  if (/^[A-Z]+$/.test(token)) return "Uppercase";
  if (/^\d+$/.test(token)) return "Numeric";
  if (/^[A-Za-z0-9]+$/.test(token)) return "Alphanumeric";
  if (/[!@#$%^&*(),.?":{}|<>]/.test(token)) return "Contains Special Chars";
  return "Mixed/Other";
}
