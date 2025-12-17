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
    } catch {
        return null;
    }
}

// Update journal entry
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const userId = await getUserFromToken();

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { title, content, sentiment, mood, moodManuallySet } = await req.json();

        // Find and update the journal entry, ensuring it belongs to the user
        const journal = await Journal.findOneAndUpdate(
            { _id: id, userId },
            {
                title,
                content,
                sentiment,
                mood,
                moodManuallySet: moodManuallySet || false,
            },
            { new: true }
        );

        if (!journal) {
            return NextResponse.json({ message: 'Journal not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Journal updated', journal }, { status: 200 });
    } catch (error) {
        console.error('Update journal error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

// Delete journal entry
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const userId = await getUserFromToken();

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Find and delete the journal entry, ensuring it belongs to the user
        const journal = await Journal.findOneAndDelete({ _id: id, userId });

        if (!journal) {
            return NextResponse.json({ message: 'Journal not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Journal deleted' }, { status: 200 });
    } catch (error) {
        console.error('Delete journal error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
