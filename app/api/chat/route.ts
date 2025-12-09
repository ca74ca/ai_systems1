import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY on the server." },
      { status: 500 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = body?.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Request must include a non-empty messages array." },
      { status: 400 }
    );
  }

  try {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini-2024-07-18",
      messages,
      max_tokens: 800,
      temperature: 0.2,
    });

    const replyText =
      completion.choices?.[0]?.message?.content?.toString() ?? "";

    return NextResponse.json({ reply: replyText });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        error: "Failed to get response from OpenAI.",
        details: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}
