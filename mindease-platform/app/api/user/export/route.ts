import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Journal from '@/models/Journal';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET - Export all user data
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await connectDB();

        // Get user profile
        const user = await User.findById(decoded.userId).select('name email createdAt');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Get all journal entries
        const journals = await Journal.find({ userId: decoded.userId }).sort({ createdAt: -1 });

        // Prepare export data
        const exportData = {
            exportDate: new Date().toISOString(),
            profile: {
                name: user.name,
                email: user.email,
                accountCreated: user.createdAt,
            },
            journals: journals.map(j => ({
                title: j.title,
                content: j.content,
                mood: j.mood,
                sentiment: j.sentiment,
                moodManuallySet: j.moodManuallySet,
                createdAt: j.createdAt,
                updatedAt: j.updatedAt,
            })),
            statistics: {
                totalJournalEntries: journals.length,
                moodDistribution: journals.reduce((acc, j) => {
                    if (j.mood) {
                        acc[j.mood] = (acc[j.mood] || 0) + 1;
                    }
                    return acc;
                }, {} as Record<string, number>),
            },
        };

        // Return as JSON (encrypted data - will be decrypted client-side)
        return NextResponse.json(exportData);
    } catch (error) {
        console.error('Error exporting data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
