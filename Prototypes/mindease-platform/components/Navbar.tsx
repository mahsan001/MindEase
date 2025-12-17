'use client';

import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);    useEffect(() => {
        // Check if user is logged in by checking for auth token
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });
                setIsLoggedIn(res.ok);
            } catch {
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, [pathname]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/#features' },
        { name: 'About', href: '/#about' },
    ];

    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
    const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/chat') || pathname.startsWith('/journal');

    if (isDashboard) return null; // Dashboard has its own sidebar

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className={`max-w-[1400px] mx-auto px-6 transition-all duration-300`}>
                <div
                    className={`flex justify-between items-center rounded-2xl px-6 py-4 transition-all duration-300 ${scrolled
                            ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/20'
                            : 'bg-transparent'
                        }`}
                >
                    {/* Logo */}
                    <div className="font-heading text-2xl font-bold text-secondary tracking-tight">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/mindease-logo.png" alt="Mindease Logo" width={30} height={35}/>
                            MindEase
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-foreground/80 font-medium hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {!isAuthPage && (
                            <>
                                {isLoggedIn ? (
                                    <Link
                                        href="/dashboard"
                                        className="bg-secondary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-secondary-hover transition-all transform hover:-translate-y-0.5 shadow-lg shadow-secondary/20"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-foreground font-medium hover:text-primary transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-secondary text-white px-6 py-2.5 rounded-xl font-medium hover:bg-secondary-hover transition-all transform hover:-translate-y-0.5 shadow-lg shadow-secondary/20"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-secondary"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-6 shadow-xl animate-slide-up">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-foreground py-2 border-b border-gray-50"
                            >
                                {link.name}
                            </Link>                        ))}
                        <div className="flex flex-col gap-3 mt-4">
                            {isLoggedIn ? (
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-center py-3 rounded-xl bg-secondary text-white font-medium"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-center py-3 rounded-xl border border-gray-200 font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-center py-3 rounded-xl bg-secondary text-white font-medium"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
