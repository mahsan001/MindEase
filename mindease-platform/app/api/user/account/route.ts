import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Journal from '@/models/Journal';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// DELETE - Delete user account and all associated data
export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await connectDB();

        // Delete all user's journal entries
        await Journal.deleteMany({ userId: decoded.userId });

        // Delete user account
        const user = await User.findByIdAndDelete(decoded.userId);

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Clear the authentication cookie
        const response = NextResponse.json({ message: 'Account deleted successfully' });
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 0,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Error deleting account:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
