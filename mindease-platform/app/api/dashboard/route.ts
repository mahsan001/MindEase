import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Journal from '@/models/Journal';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export async function GET() {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        let decoded: any;
        try {
            decoded = jwt.verify(token.value, JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
        }

        const userId = decoded.userId;

        // Fetch user data
        const user = await User.findById(userId).select('name');
        
        // Fetch stats
        const journalCount = await Journal.countDocuments({ userId });

        // Calculate mood streak (consecutive days with entries)
        // This is a simplified calculation
        const journals = await Journal.find({ userId }).sort({ createdAt: -1 }).limit(30);
        let streak = 0;
        if (journals.length > 0) {
            streak = 1;
            // Logic for streak calculation could be more complex
            // For now, just returning a placeholder or simple count
        }        // Calculate mindful minutes (mocked for now as we don't track duration)
        const mindfulMinutes = journalCount * 15; // Assume 15 mins per entry

        return NextResponse.json({
            user: {
                name: user?.name || 'User'
            },
            stats: {
                journalCount,
                moodStreak: streak, // Placeholder logic
                mindfulMinutes
            }
        });

    } catch (error) {
        console.error('Dashboard API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
