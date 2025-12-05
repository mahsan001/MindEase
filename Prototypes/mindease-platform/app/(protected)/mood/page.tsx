'use client';

import { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, Calendar, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface MoodData {
    date: string;
    mood: string;
    score: number; // 1-5
}

export default function MoodPage() {
    const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    useEffect(() => {
        fetchMoodHistory();
    }, []);

    const fetchMoodHistory = async () => {
        try {
            const res = await fetch('/api/journal');
            const data = await res.json();

            if (data.journals) {
                // Transform journal entries into mood data
                const moodMap: Record<string, number> = {
                    '😢': 1, '😟': 2, '😐': 3, '😊': 4, '😄': 5
                };

                const history = data.journals.map((entry: any) => ({
                    date: new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'short' }),
                    mood: entry.mood || '😐',
                    score: moodMap[entry.mood] || 3
                })).reverse().slice(-7); // Last 7 entries

                setMoodHistory(history);
            }
        } catch (error) {
            showToast('Failed to load mood history', 'error');
        } finally {
            setLoading(false);
        }
    };

    const getAverageMood = () => {
        if (moodHistory.length === 0) return 0;
        const sum = moodHistory.reduce((acc, curr) => acc + curr.score, 0);
        return (sum / moodHistory.length).toFixed(1);
    };

    const getMoodTrend = () => {
        if (moodHistory.length < 2) return 'neutral';
        const last = moodHistory[moodHistory.length - 1].score;
        const prev = moodHistory[moodHistory.length - 2].score;
        if (last > prev) return 'up';
        if (last < prev) return 'down';
        return 'neutral';
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="flex-1 flex flex-col lg:flex-row gap-8 h-full">

                {/* Main Chart Section */}
                <div className="flex-[2] glass rounded-[2.5rem] shadow-xl p-8 flex flex-col relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
                    </div>

                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h1 className="font-heading text-3xl font-bold text-secondary mb-2">Mood Insights</h1>
                            <p className="text-foreground/60">Tracking your emotional journey over the last 7 entries.</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 flex items-center gap-2 text-sm font-bold text-secondary">
                            <Calendar size={16} className="text-primary" />
                            Last 7 Entries
                        </div>
                    </div>

                    {/* Custom Chart */}
                    <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-8 relative min-h-[300px]">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-full h-px bg-secondary border-t border-dashed"></div>
                            ))}
                        </div>

                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            </div>
                        ) : moodHistory.length > 0 ? (
                            moodHistory.map((data, index) => (
                                <div key={index} className="flex flex-col items-center gap-3 w-full group relative z-10">
                                    <div
                                        className="w-full max-w-[60px] bg-gradient-to-t from-primary/20 to-primary rounded-2xl relative transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg shadow-primary/20"
                                        style={{ height: `${(data.score / 5) * 300}px` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl transition-transform duration-300 group-hover:-translate-y-2">
                                            {data.mood}
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold text-secondary/60">{data.date}</span>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center text-gray-400">
                                No mood data available yet. Start journaling to track your mood!
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Average Mood Card */}
                    <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent -z-10"></div>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-primary">
                            <BarChart2 size={32} />
                        </div>
                        <div className="font-heading text-5xl font-bold text-secondary mb-2">{getAverageMood()}</div>
                        <div className="text-foreground/60 font-medium mb-6">Average Mood Score</div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-secondary transition-all duration-1000"
                                style={{ width: `${(Number(getAverageMood()) / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Trend Card */}
                    <div className="glass-card p-8 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-accent">
                            <TrendingUp size={32} />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            {getMoodTrend() === 'up' && <ArrowUp size={32} className="text-success" />}
                            {getMoodTrend() === 'down' && <ArrowDown size={32} className="text-error" />}
                            {getMoodTrend() === 'neutral' && <Minus size={32} className="text-gray-400" />}
                            <span className="font-heading text-3xl font-bold text-secondary">
                                {getMoodTrend() === 'up' ? 'Improving' : getMoodTrend() === 'down' ? 'Declining' : 'Stable'}
                            </span>
                        </div>
                        <div className="text-foreground/60 font-medium">Recent Trend</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
