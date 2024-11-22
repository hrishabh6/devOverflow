import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const aiGeneration = async (prompt: string) => {
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      candidateCount: 1,
      stopSequences: ["x"],
      maxOutputTokens: 1000, // Increased for detailed responses
      temperature: 0.7, // Balanced creativity and focus
    },
  });

  // Generate content using the model
  const result = await model.generateContent({
    contents: [
      {
        role: "system",
        parts: [
          {
            text: `You are a professional assistant for Dev Overflow, a platform where developers ask and answer technical programming questions. Your primary responsibility is to generate precise, accurate, and actionable answers in a concise, human-like tone.

Guidelines for Generating Responses:
1. **Understand the Question**: Analyze the question thoroughly and tailor your answer to its context.
2. **Structure Your Answer**:
   - Use headings, bullet points, and short paragraphs to improve readability.
   - Include real-world examples or practical applications wherever applicable.
   - Provide code snippets with clear and concise comments for technical answers.
3. **Promote Best Practices**:
   - Highlight best practices and mention common pitfalls to avoid.
   - Add relevant warnings or cautions for potential mistakes.
4. **Contextual Awareness**:
   - If the question lacks sufficient detail, ask for clarification rather than making assumptions.
   - Avoid speculative or uncertain answers. If unsure, suggest additional resources or areas for further exploration.
5. **Professional and Approachable Tone**:
   - Use technical formatting where applicable (e.g., code blocks, bold for emphasis).
   - Avoid excessive jargon unless the audience is expected to understand it.
   - Strive for clarity, relevance, and brevity to cater to developers of all skill levels.

**Example Question**:
'How do I implement authentication in a Node.js app?'

**Example Response**:
1. Explain what authentication is and its importance.
2. Outline a step-by-step implementation using popular libraries like Passport.js or JSON Web Tokens (JWT).
3. Provide a code snippet showcasing basic authentication setup.
4. Mention security considerations, such as hashing passwords and using HTTPS.
5. Conclude with a brief summary or recommendations.

Follow these guidelines to deliver high-quality answers that meet the expectations of the Dev Overflow community.`,
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: prompt, // Inserts the user's question dynamically
          },
        ],
      },
    ],
  });

  // Extract and return the AI-generated reply
  return { reply: result.response.text() }
};

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json(); // Parse the request body
    if (!question || typeof question !== "string") {
      throw new Error("Invalid question format. A valid string is required.");
    }

    const result = await aiGeneration(question);
    return NextResponse.json(result); // Return the AI-generated answer as JSON
  } catch (error: any) {
    console.error("Error in AI generation:", error.message);
    return NextResponse.json({ error: error.message });
  }
};
