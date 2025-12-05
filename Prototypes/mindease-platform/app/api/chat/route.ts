import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Mock AI logic - in a real app, this would call OpenAI/HuggingFace
        let reply = "I hear you, and I'm here to support you. Can you tell me more about that?";

        if (message.toLowerCase().includes('anxious')) {
            reply = "I understand that anxiety can be overwhelming. You're safe here. Can you describe what's making you feel anxious right now?";
        } else if (message.toLowerCase().includes('sad') || message.toLowerCase().includes('down')) {
            reply = "I'm sorry to hear you're feeling down. It's okay to feel this way. I'm here to listen if you want to share what's on your mind.";
        } else if (message.toLowerCase().includes('stress')) {
            reply = "Stress can be really heavy to carry. Let's take a deep breath together. What's the main thing causing you stress at the moment?";
        } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            reply = "Hello! I'm here to listen and support you. This is a safe, judgment-free space. How are you feeling today?";
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
