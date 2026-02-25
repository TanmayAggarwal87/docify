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
You are a technical documentation expert creating a professional GitHub README.md.

# Repository Information
- Repository Name: ${repo}
- Author: [${session?.user?.name}](https://github.com/${session?.user?.login})
- Email: ${session?.user?.email}
- File Structure:
${JSON.stringify(contents, null, 2)}

# Required Structure

1. **Header**
   - Project title with one-line tagline
   - Technology badges (shields.io format)
   - Brief 2-3 sentence description

2. **Visual Diagrams (2-4 Mermaid diagrams minimum)**
   - System Architecture flowchart
   - Data Flow sequence diagram
   - ER Diagram (if database exists)
   - Component/Contract interactions (based on project type)
   - mermaid code should have perfect syntax with no errors 

3. **Problem Statement**
   - What problem does this solve and why does it matter?

4. **Solution Overview**
   - How does this project solve it?

5. **Key Features**
   - Bullet points of main capabilities

6. **Tech Stack**
   - Present as table with columns: Category | Technology | Purpose

7. **Quick Start/Installation**
   - Step-by-step setup commands
   - Separate sections if monorepo

8. **Environment Variables**
   - Table format: Variable | Description | Example | Required
   - Include example .env block

9. **API Endpoints** (if applicable)
   - Table: Method | Endpoint | Description | Auth
   - Include curl example with response

10. **Project Structure**
    - Tree diagram of folder organization

11. **Deployment & Architecture Decisions**
    - Where it's hosted and WHY that choice was made
    - Technical trade-offs and reasoning

12. **Technical Challenges & Solutions**
    - 2-3 major challenges faced
    - How they were solved with specific details

13. **Development Commands**
    - Common dev, test, build commands

14. **Testing Approach**
    - Current state and plans

15. **Contributing Guidelines**
    - Casual and motivating tone

16. **Links** (if applicable)
    - Live demo, docs, etc.

17. **License**

18. **Author Section**
    Built by [${session?.user?.name}](https://github.com/${session?.user?.login})  
    📧 ${session?.user?.email}

# Style Guidelines
- dont use any emojis in any section
- Use \`---\` horizontal rules between major sections
- Prefer tables over lists for structured data
- Include actual runnable code examples
- Focus on WHY decisions were made, not just WHAT
- Professional but approachable tone
- Ensure all Mermaid diagrams use valid syntax with no error
- Analyze file structure to infer project type and create contextually appropriate diagrams
- At last add a line --made by docify--

# Output
Return clean markdown only. No code blocks, no preamble.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return NextResponse.json({ readme: response.text });
}


