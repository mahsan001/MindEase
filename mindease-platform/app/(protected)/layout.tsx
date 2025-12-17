'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileBottomNav from '@/components/dashboard/MobileBottomNav';
import { UserProvider } from '@/context/UserContext';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/check');
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    router.push('/register');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                router.push('/register');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-secondary">Loading...</p>
                </div>
            </div>
        );
    }    if (!isAuthenticated) {
        return null;
    }

    return (
        <UserProvider>
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="max-w-[1400px] mx-auto flex gap-8 px-4 md:px-6 py-4 min-h-screen pb-20 md:pb-4">
                    <Sidebar />
                    <main className="flex-1 min-w-0 w-full">
                        {children}
                    </main>
                </div>
                <MobileBottomNav />
            </div>
        </UserProvider>
    );
}
