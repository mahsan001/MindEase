import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// GET - Fetch user profile
export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        await connectDB();

        const user = await User.findById(decoded.userId).select('name email');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT - Update user profile
export async function PUT(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        const { name, email } = await req.json();

        await connectDB();

        // Check if email is already taken by another user
        if (email) {
            const existingUser = await User.findOne({ email, _id: { $ne: decoded.userId } });
            if (existingUser) {
                return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
            }
        }

        const user = await User.findByIdAndUpdate(
            decoded.userId,
            { name, email },
            { new: true, runValidators: true }
        ).select('name email');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Profile updated successfully',
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
