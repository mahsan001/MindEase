'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Book, BarChart2, Lightbulb, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: MessageSquare, label: 'AI Therapist', href: '/chat' },
        { icon: Book, label: 'My Journals', href: '/journal' },
        { icon: BarChart2, label: 'Mood Tracker', href: '/mood' },
        { icon: Lightbulb, label: 'Daily Tips', href: '/tips' },
        { icon: Settings, label: 'Settings', href: '/settings' },
        { icon: HelpCircle, label: 'Help & Support', href: '/help' },
    ];

    return (
        <aside className="w-72 bg-white h-[calc(100vh-80px)] sticky top-20 hidden md:block shadow-sm overflow-y-auto">
            <div className="p-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                    Navigation
                </div>
                <ul className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-600 hover:bg-background hover:text-primary hover:translate-x-1'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}
