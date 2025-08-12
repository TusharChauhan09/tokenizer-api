import { Request, Response } from "express";
import {
  tokenize,
  replaceCommon,
  restoreCommon,
  encryptToken,
  decryptToken,
} from "../lib";

export async function tokens(req: Request, res: Response): Promise<any> {
  try {
    const { sentence } = req.body;

    if (!sentence || typeof sentence !== "string") {
      return res.status(400).json({
        error: "Sentence is required and must be a string",
      });
    }

    const tokens = tokenize(sentence);

    return res.status(200).json({
      success: true,
      sentence: sentence,
      tokens: tokens,
      totalTokens: tokens.length,
    });
  } catch (error) {
    console.error("Error during tokenization:", error);
    return res.status(500).json({
      error: "Internal server error during tokenization",
    });
  }
}

export async function encode(req: Request, res: Response): Promise<any> {
  try {
    const { tokens, shift = 5 } = req.body;

    if (!tokens || !Array.isArray(tokens)) {
      return res.status(400).json({
        error: "Tokens array is required",
      });
    }

    const withCommonWords = replaceCommon(tokens);

    const encodedTokens = withCommonWords.map((token) =>
      encryptToken(token, shift)
    );

    return res.status(200).json({
      success: true,
      originalTokens: tokens,
      withCommonWords: withCommonWords,
      encodedTokens: encodedTokens,
      shift: shift,
    });
  } catch (error) {
    console.error("Error during encoding:", error);
    return res.status(500).json({
      error: "Internal server error during encoding",
    });
  }
}

export async function decode(req: Request, res: Response): Promise<any> {
  try {
    const { encodedTokens, shift = 5 } = req.body;

    if (!encodedTokens || !Array.isArray(encodedTokens)) {
      return res.status(400).json({
        error: "Encoded tokens array is required",
      });
    }

    const decryptedTokens = encodedTokens.map((token) =>
      decryptToken(token, shift)
    );

    const restoredTokens = restoreCommon(decryptedTokens);

    const decodedSentence = restoredTokens.join(" ");

    return res.status(200).json({
      success: true,
      encodedTokens: encodedTokens,
      decryptedTokens: decryptedTokens,
      restoredTokens: restoredTokens,
      decodedSentence: decodedSentence,
      shift: shift,
    });
  } catch (error) {
    console.error("Error during decoding:", error);
    return res.status(500).json({
      error: "Internal server error during decoding",
    });
  }
}
