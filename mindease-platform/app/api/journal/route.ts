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

        // Parse URL for pagination params
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        // Get total count
        const totalCount = await Journal.countDocuments({ userId });

        // Get paginated journals
        const journals = await Journal.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({ 
            journals,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                hasMore: skip + journals.length < totalCount
            }
        });
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

        const { title, content, sentiment, mood, moodManuallySet } = await req.json();

        const journal = await Journal.create({
            userId,
            title,
            content,
            sentiment,
            mood,
            moodManuallySet: moodManuallySet || false,
        });

        return NextResponse.json({ message: 'Journal created', journal }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
