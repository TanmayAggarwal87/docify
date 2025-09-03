import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const { repo, contents } = await req.json();

  const prompt = `
You are a PROFESSIONAL GitHub README generator.
Generate a professional README.md for the following repository.
It must Contain Project Title, description, features, tech stack, installation guide, project structure and licence information.
Add a bottom line at last: -- made by docify --

Repository Name: ${repo}
Here is the project file structure:
${JSON.stringify(contents, null, 2)}

Output a clean and well-structured README.md (use Markdown).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return NextResponse.json({ readme: response.text });
}
