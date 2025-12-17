import Navbar from '@/components/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import MobileBottomNav from '@/components/dashboard/MobileBottomNav';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />            <div className="max-w-[1400px] mx-auto flex gap-8 px-4 md:px-6 py-4 min-h-screen pb-20 md:pb-4">
                <Sidebar />
                <main className="flex-1 min-w-0 w-full">
                    {children}
                </main>
            </div>
            <MobileBottomNav />
        </div>
    );
}
