import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mysql from "mysql2/promise";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const db = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a professional summarizer.

Your task is to summarize the text below clearly and naturally.

RULES:
- Keep the original meaning
- Do NOT add new information
- Do NOT copy sentence by sentence
- Use a short paragraph (2–5 sentences)
- Make it simple and easy to understand
- Focus only on the main idea

TEXT:
${text}
`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    await db.execute(
      "INSERT INTO Summary (originalText, summary) VALUES (?, ?)",
      [text, summary]
    );

    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}