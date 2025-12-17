import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // or 'gpt-3.5-turbo'
                messages: [
                    { role: 'system', content: 'You are a friendly mental health assistant. Respond empathetically and help users explore their feelings. Avoid judgment, be supportive, and encourage positive next steps.Never use i am really sorry in your chat' },
                    { role: 'user', content: message } // user message
                ],
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        // The AI reply
        const reply = data.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}


