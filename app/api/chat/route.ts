import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // must be set in .env.local + Render
});

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY on server" }),
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({
          error:
            "Invalid request body. Expected { messages: [{ role, content }, ...] }",
        }),
        { status: 400 }
      );
    }

    // You can change this model if you want
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const response = await openai.responses.create({
      model,
      input: body.messages,
      max_output_tokens: 800,
      temperature: 0.2,
    });

    // Extract plain text from Responses API
    let replyText = "";
    const output = response.output?.[0];

    if (output && output.type === "message") {
      const textPart = output.content?.find((c: any) => c.type === "output_text");
      if (textPart && textPart.text) {
        replyText = textPart.text;
      }
    }

    if (!replyText) {
      replyText = "I’m having trouble generating a response right now.";
    }

    return new Response(JSON.stringify({ reply: replyText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Chat route error:", err);
    return new Response(
      JSON.stringify({
        error: "Chat route failed",
        details: err?.message ?? "Unknown error",
      }),
      { status: 500 }
    );
  }
}
