import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { transcript, conversationHistory = [] } = await req.json();

  try {
    // Make the API call to OpenAI's GPT-3.5-turbo model
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",  // Using the gpt-3.5-turbo model for free-tier compatibility
      messages: [
        {
          role: "system",
          content: "You are an English conversation coach for Japanese learners. Correct grammar, give pronunciation advice, and ask natural follow-up questions. Keep responses short and friendly.",
        },
        ...conversationHistory,  // Include conversation history if available
        {
          role: "user",
          content: transcript,  // User's spoken input
        },
      ],
    });

    const reply = completion.choices[0].message.content;  // Extract AI's response

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error("AI Error:", err);

    // Type assertion to Error so we can access error properties
    if (err instanceof Error) {
      // Handle different errors based on the message or status
      if (err.message.includes('429')) {
        return NextResponse.json({ error: "API quota exceeded. Please try again later." }, { status: 429 });
      }

      // Return a 500 error for other errors
      return NextResponse.json({ error: "Failed to generate response: " + err.message }, { status: 500 });
    }

    // Default error handling for unknown types
    return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
  }
}


