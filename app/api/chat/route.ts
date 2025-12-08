import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = body.messages ?? (body.prompt ? [{ role: 'user', content: body.prompt }] : []);

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const MODEL = process.env.OPENAI_MODEL ?? 'gpt-3.5-turbo';

    if (!OPENAI_KEY) {
      return NextResponse.json({ error: 'Missing OpenAI API key. Set OPENAI_API_KEY in your environment.' }, { status: 401 });
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({ model: MODEL, messages, max_tokens: 800, temperature: 0.2 }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return NextResponse.json({ error: data }, { status: resp.status });
    }

    const assistant = data.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ assistant, raw: data });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
