import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = body.messages ?? (body.prompt ? [{ role: 'user', content: body.prompt }] : []);

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

    if (!OPENAI_KEY) {
      return NextResponse.json({ error: 'Missing OpenAI API key. Set OPENAI_API_KEY in your environment.' }, { status: 401 });
    }

    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.2, stream: true }),
    });

    if (!openAiRes.ok) {
      const errText = await openAiRes.text();
      return NextResponse.json({ error: errText }, { status: openAiRes.status });
    }

    // Pipe the OpenAI streaming response directly to the client as text/event-stream
    return new Response(openAiRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
