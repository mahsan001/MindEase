'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Book, BarChart2, Lightbulb, Settings } from 'lucide-react';

export default function MobileBottomNav() {
    const pathname = usePathname();

    const menuItems = [
        { icon: Home, label: 'Home', href: '/dashboard' },
        { icon: MessageSquare, label: 'AI Chat', href: '/chat' },
        { icon: Book, label: 'Journal', href: '/journal' },
        { icon: BarChart2, label: 'Mood', href: '/mood' },
        { icon: Lightbulb, label: 'Tips', href: '/tips' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="grid grid-cols-6 h-16">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                                isActive 
                                    ? 'text-secondary' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
