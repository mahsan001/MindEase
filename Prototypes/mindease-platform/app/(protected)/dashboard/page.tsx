'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lightbulb, Edit3, MessageSquare, BarChart2, Target, ArrowUpRight, Calendar } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        journalCount: 0,
        moodStreak: 0,
        mindfulMinutes: 0
    });
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();
    const router = useRouter();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const res = await fetch('/api/dashboard');
            if (res.status === 401) {
                showToast('Session expired. Please log in again.', 'error');
                router.push('/login');
                return;
            }
            const data = await res.json();
            if (data.stats) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
            showToast('Failed to load dashboard data.', 'error');
        } finally {
            setLoading(false);
        }
    };    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in pb-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-3">
                <div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-2">Good Morning, User</h1>
                    <p className="text-base md:text-lg text-foreground/60">Ready to find your balance today?</p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-medium text-secondary">
                    <Calendar size={16} className="text-primary" />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Daily Tip - Hero Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary text-white p-8 md:p-12 shadow-xl shadow-secondary/20 group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/30 transition-colors duration-700"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider">
                            <Lightbulb size={14} className="text-accent" />
                            Daily Wisdom
                        </div>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                            "The only way out is through."
                        </h2>
                        <p className="text-white/80 text-lg leading-relaxed">
                            Today, try to face one small challenge you've been avoiding. Acknowledge the discomfort, breathe through it, and take a single step forward.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-full md:w-auto min-w-[200px]">
                        <div className="text-sm text-white/60 mb-1">Focus for today</div>
                        <div className="text-xl font-heading font-bold">Courage</div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Journal Entries', value: loading ? '...' : stats.journalCount.toString(), icon: Edit3, color: 'text-primary', bg: 'bg-primary/10' },
                    { label: 'Mindful Minutes', value: loading ? '...' : stats.mindfulMinutes.toString(), icon: Target, color: 'text-secondary', bg: 'bg-secondary/10' },
                    { label: 'Mood Streak', value: loading ? '...' : `${stats.moodStreak} Days`, icon: BarChart2, color: 'text-accent', bg: 'bg-accent/10' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-5 group">
                        <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon size={32} />
                        </div>
                        <div>
                            <div className={`font-heading text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                            <div className="text-foreground/60 font-medium">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl font-bold text-secondary">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/journal" className="group bg-white p-1 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="bg-surface-alt rounded-[1.7rem] p-6 h-full transition-colors group-hover:bg-primary/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <Edit3 size={24} />
                                </div>
                                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-secondary mb-2">Write Journal</h3>
                            <p className="text-foreground/60 text-sm">Reflect on your day and clear your mind.</p>
                        </div>
                    </Link>

                    <Link href="/chat" className="group bg-white p-1 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="bg-surface-alt rounded-[1.7rem] p-6 h-full transition-colors group-hover:bg-secondary/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    <MessageSquare size={24} />
                                </div>
                                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all duration-300">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-secondary mb-2">Chat with AI</h3>
                            <p className="text-foreground/60 text-sm">Talk through your feelings in a safe space.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
