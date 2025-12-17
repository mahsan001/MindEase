'use client';

import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, Book, BarChart2, Lightbulb, Settings, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: MessageSquare, label: 'AI Therapist', href: '/chat' },
        { icon: Book, label: 'My Journals', href: '/journal' },
        { icon: BarChart2, label: 'Mood Tracker', href: '/mood' },
        { icon: Lightbulb, label: 'Daily Tips', href: '/tips' },
    ];

    const bottomItems = [
        { icon: Settings, label: 'Settings', href: '/settings' },
        { icon: HelpCircle, label: 'Help & Support', href: '/help' },
    ];

    return (
        <aside className="w-72 hidden md:flex flex-col h-[calc(100vh-40px)] sticky top-5 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/40 shadow-sm ml-5 overflow-hidden">
            {/* Logo Area */}
            <div className="p-8 pb-4">
                <Link href="/" className="flex items-center gap-2 font-heading text-2xl font-bold text-secondary">
                    <Image src="/mindease-logo.png" alt="Mindease Logo" width={30} height={35}/>
                    MindEase
                </Link>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="text-xs font-bold text-secondary/40 uppercase tracking-widest mb-4 px-4 font-heading">
                    Menu
                </div>
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300 group ${isActive
                                            ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                                            : 'text-foreground/70 hover:bg-white hover:text-secondary hover:shadow-sm'
                                        }`}
                                >
                                    <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Bottom Navigation */}
            <div className="p-4 border-t border-secondary/5 bg-white/30">
                <ul className="space-y-1">
                    {bottomItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-foreground/70 hover:bg-white hover:text-secondary hover:shadow-sm transition-all duration-300 group"
                                >
                                    <Icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-error/80 hover:bg-error/10 hover:text-error transition-all duration-300 group">
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>Sign Out</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
