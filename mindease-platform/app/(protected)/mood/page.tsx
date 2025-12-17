'use client';

import { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, Calendar, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface MoodEntry {
    mood: string;
    score: number;
    time: string;
    timeOfDay: 'morning' | 'afternoon' | 'evening';
}

interface DayMoodData {
    date: string;
    dayName: string;
    entries: MoodEntry[];
}

export default function MoodPage() {
    const [moodHistory, setMoodHistory] = useState<DayMoodData[]>([]);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();    useEffect(() => {
        fetchMoodHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getTimeOfDay = (date: Date): 'morning' | 'afternoon' | 'evening' => {
        const hours = date.getHours();
        if (hours < 12) return 'morning';
        if (hours < 18) return 'afternoon';
        return 'evening';
    };

    const fetchMoodHistory = async () => {
        try {
            const res = await fetch('/api/journal');
            const data = await res.json();            if (data.journals) {
                const moodMap: Record<string, number> = {
                    '😢': 1, '😟': 2, '😐': 3, '😊': 4, '😄': 5
                };

                // Group entries by day
                const dayGroups: Record<string, DayMoodData> = {};

                data.journals.forEach((entry: { createdAt: string; mood: string }) => {
                    const entryDate = new Date(entry.createdAt);
                    const dateKey = entryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    const dayName = entryDate.toLocaleDateString('en-US', { weekday: 'short' });
                    const timeOfDay = getTimeOfDay(entryDate);

                    if (!dayGroups[dateKey]) {
                        dayGroups[dateKey] = {
                            date: dateKey,
                            dayName,
                            entries: []
                        };
                    }

                    dayGroups[dateKey].entries.push({
                        mood: entry.mood || '😐',
                        score: moodMap[entry.mood] || 3,
                        time: entryDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        timeOfDay
                    });
                });

                // Convert to array and sort by date, take last 7 days
                const sortedHistory = Object.values(dayGroups)
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(-7);

                setMoodHistory(sortedHistory);
            }        } catch {
            showToast('Failed to load mood history', 'error');
        } finally {
            setLoading(false);
        }
    };const getAverageMood = () => {
        if (moodHistory.length === 0) return 0;
        const allScores = moodHistory.flatMap(day => day.entries.map(entry => entry.score));
        if (allScores.length === 0) return 0;
        const sum = allScores.reduce((acc, curr) => acc + curr, 0);
        return (sum / allScores.length).toFixed(1);
    };

    const getMoodTrend = () => {
        if (moodHistory.length < 2) return 'neutral';
        const lastDay = moodHistory[moodHistory.length - 1];
        const prevDay = moodHistory[moodHistory.length - 2];
        
        const lastAvg = lastDay.entries.reduce((sum, e) => sum + e.score, 0) / lastDay.entries.length;
        const prevAvg = prevDay.entries.reduce((sum, e) => sum + e.score, 0) / prevDay.entries.length;
        
        if (lastAvg > prevAvg) return 'up';
        if (lastAvg < prevAvg) return 'down';
        return 'neutral';
    };    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-8 h-full">

                {/* Main Chart Section */}
                <div className="flex-[3] glass rounded-3xl md:rounded-[2.5rem] shadow-xl p-4 md:p-8 flex flex-col relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between md:items-start gap-3 mb-6 md:mb-12">
                        <div>
                            <h1 className="font-heading text-2xl md:text-3xl font-bold text-secondary mb-1 md:mb-2">Mood Insights</h1>
                            <p className="text-foreground/60 text-sm md:text-base">Tracking your emotional journey over the last 7 entries.</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm px-3 md:px-4 py-2 rounded-xl border border-white/40 flex items-center gap-2 text-xs md:text-sm font-bold text-secondary w-fit">
                            <Calendar size={14} className="text-primary md:w-4 md:h-4" />
                            Last 7 Entries
                        </div>
                    </div>{/* Custom Chart */}
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
                            </div>                        ) : moodHistory.length > 0 ? (
                            moodHistory.map((dayData, dayIndex) => {
                                // Group entries by time of day
                                const morningEntries = dayData.entries.filter(e => e.timeOfDay === 'morning');
                                const afternoonEntries = dayData.entries.filter(e => e.timeOfDay === 'afternoon');
                                const eveningEntries = dayData.entries.filter(e => e.timeOfDay === 'evening');

                                const renderTimeSection = (entries: MoodEntry[], label: string, bgColor: string) => {
                                    return (
                                        <div className={`flex-1 flex flex-col items-center justify-end gap-2 p-1 ${bgColor} relative`}>
                                            {/* Time label at top */}
                                            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-black/40 uppercase tracking-wider">
                                                {label}
                                            </div>
                                            {/* Stacked emojis */}
                                            <div className="flex flex-col gap-1 mt-4">
                                                {entries.map((entry, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="text-md transition-transform duration-300 hover:scale-125 cursor-default drop-shadow-lg"
                                                        title={`${entry.time} - Score: ${entry.score}`}
                                                    >
                                                        {entry.mood}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                };

                                return (
                                    <div key={dayIndex} className="flex flex-col items-center gap-3 w-full group relative z-10">
                                        {/* Day container with 3 horizontal sections */}
                                        <div className="w-full max-w-24 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-white/50 shadow-lg overflow-hidden min-h-40 flex mb-3">
                                            {/* Morning Section (Left) */}
                                            {renderTimeSection(morningEntries, 'Mor', 'bg-amber-300/50')}

                                            {/* Afternoon Section (Middle) */}
                                            {renderTimeSection(afternoonEntries, 'Aft', 'bg-orange-300/50 border-b-2 border-dashed border-white/40')}
                                            
                                            {/* Evening Section (Right) */}
                                            {renderTimeSection(eveningEntries, 'Eve', 'bg-indigo-300/50 border-b-2 border-dashed border-white/40')}
                                            
                                            
                                        </div>
                                        {/* Date label */}
                                        <div className="text-center">
                                            <div className="text-xs font-bold text-secondary">{dayData.dayName}</div>
                                            <div className="text-[10px] text-secondary/50">{dayData.date}</div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full text-center text-gray-400">
                                No mood data available yet. Start journaling to track your mood!
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Sidebar */}
                <div className="flex-1 flex flex-col gap-4 md:gap-6">
                    {/* Average Mood Card */}
                    <div className="glass-card p-6 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent -z-10"></div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 text-primary">
                            <BarChart2 size={28} />
                        </div>
                        <div className="font-heading text-4xl font-bold text-secondary mb-1">{getAverageMood()}</div>
                        <div className="text-foreground/60 font-medium text-sm mb-4">Average Mood Score</div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-secondary transition-all duration-1000"
                                style={{ width: `${(Number(getAverageMood()) / 5) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Trend Card */}
                    <div className="glass-card p-6 rounded-3xl md:rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10"></div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 text-accent">
                            <TrendingUp size={28} />
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            {getMoodTrend() === 'up' && <ArrowUp size={24} className="text-success" />}
                            {getMoodTrend() === 'down' && <ArrowDown size={24} className="text-error" />}
                            {getMoodTrend() === 'neutral' && <Minus size={24} className="text-gray-400" />}
                            <span className="font-heading text-2xl font-bold text-secondary">
                                {getMoodTrend() === 'up' ? 'Improving' : getMoodTrend() === 'down' ? 'Declining' : 'Stable'}
                            </span>
                        </div>
                        <div className="text-foreground/60 font-medium text-sm">Recent Trend</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
