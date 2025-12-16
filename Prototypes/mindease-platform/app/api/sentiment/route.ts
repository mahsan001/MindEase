import { NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/sentiment';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            );
        }

        const result = analyzeSentiment(text);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error('Sentiment analysis error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
