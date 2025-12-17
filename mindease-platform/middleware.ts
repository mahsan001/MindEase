import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Routes that require authentication
const protectedRoutes = [
    '/dashboard',
    '/chat',
    '/journal',
    '/mood',
    '/tips',
    '/settings',
    '/help',
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => 
        pathname.startsWith(route)
    );

    if (isProtectedRoute) {
        const token = request.cookies.get('token');

        // If no token, redirect to register page
        if (!token) {
            const url = request.nextUrl.clone();
            url.pathname = '/register';
            return NextResponse.redirect(url);
        }

        // Verify the token
        try {
            await jwtVerify(
                token.value,
                new TextEncoder().encode(JWT_SECRET)
            );
            // Token is valid, allow access
            return NextResponse.next();
        } catch {
            // Token is invalid, redirect to register page
            const url = request.nextUrl.clone();
            url.pathname = '/register';
            const response = NextResponse.redirect(url);
            // Clear the invalid token
            response.cookies.delete('token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
    ],
};
