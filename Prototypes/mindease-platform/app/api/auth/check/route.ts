import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        try {
            jwt.verify(token.value, JWT_SECRET);
            return NextResponse.json({ authenticated: true }, { status: 200 });
        } catch {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
}
