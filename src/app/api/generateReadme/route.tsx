import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { auth } from "../../../../auth";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  const session = await auth()
  console.log(session)
  const { repo, contents } = await req.json();

  const prompt = `
You are a PROFESSIONAL GitHub README generator.
Generate a professional README.md for the following repository.
Generate a comprehensive README.md with the following sections:

1. Project Title with brief tagline
2. Live Demo Link 
4. Problem Statement (what problem does this solve and why)
5. Solution Overview (how does this solve it)
6. Key Features (bullet points)
7. Tech Stack
9. Technical Challenges & Solutions (biggest problems faced and how solved)
10. Installation Guide (step-by-step setup)
11. Environment Variables (with example .env)
12. Project Structure (folder organization)
13. Deployment Information (where it's hosted and why)
14. Testing Approach (current state and plans)
17. Contributing Guidelines (casual and motivating)
18. License Information
19. Author/Contact 

Author Name = ${session?.user?.name} also mention profile url embeded in it name url = https://github.com/${session?.user?.login}
Author Email = ${session?.user?.email}

Focus on: WHY decisions were made wherever nessecary like in deployment and all not on tehchstack and if using a uncommon npm package, not just WHAT was built.
Include specific technical details, metrics, and trade-offs.
ALSO NO emojis keep it professional
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


