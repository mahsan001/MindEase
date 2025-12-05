import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Journal from '@/models/Journal';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) return null;

    try {
        const decoded = jwt.verify(token.value, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

export async function GET(req: Request) {
    try {
        await dbConnect();
        const userId = await getUserFromToken();

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const journals = await Journal.find({ userId }).sort({ createdAt: -1 });
        return NextResponse.json({ journals });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await dbConnect();
        const userId = await getUserFromToken();

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { title, content, sentiment, mood } = await req.json();

        const journal = await Journal.create({
            userId,
            title,
            content,
            sentiment,
            mood, // Assuming we add mood to the schema or use sentiment field
        });

        return NextResponse.json({ message: 'Journal created', journal }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
