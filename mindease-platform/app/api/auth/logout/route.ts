import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
    try {
        // Clear the token cookie
        const cookie = serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1, // Expire immediately
            path: '/',
        });

        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );

        response.headers.set('Set-Cookie', cookie);

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: 'Logout failed' },
            { status: 500 }
        );
    }
}
