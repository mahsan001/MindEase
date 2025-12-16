'use client';

import { useState, useEffect, useRef } from 'react';
import { Trash2, Save, Plus, Search, Sparkles, Calendar } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface JournalEntry {
    _id: string;
    title: string;
    content: string;
    mood: string;
    createdAt: string;
    sentiment?: string;
    moodManuallySet?: boolean;
}

export default function JournalPage() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        mood: '😐',
    });
    const [showAIAnalysis, setShowAIAnalysis] = useState(false);
    const [loading, setLoading] = useState(false);
    const [moodManuallySet, setMoodManuallySet] = useState(false);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const moods = ['😢', '😟', '😐', '😊', '😄'];    useEffect(() => {
        fetchEntries();
    }, []);

    // Sentiment analysis effect with debounce
    useEffect(() => {
        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Only analyze if mood hasn't been manually set and content exists
        if (!moodManuallySet && formData.content.trim().length > 10) {
            debounceTimerRef.current = setTimeout(async () => {
                try {
                    const response = await fetch('/api/sentiment', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: formData.content }),
                    });
                    
                    const data = await response.json();
                    if (data.mood) {
                        setFormData(prev => ({ ...prev, mood: data.mood }));
                    }
                } catch (error) {
                    console.error('Sentiment analysis failed:', error);
                }
            }, 100); // 100ms debounce
        }

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [formData.content, moodManuallySet]);

    const fetchEntries = async () => {
        try {
            const res = await fetch('/api/journal');
            const data = await res.json();
            if (data.journals) {
                setEntries(data.journals);
            }
        } catch (error) {
            console.error('Failed to fetch journals', error);
        }
    };

    const { showToast } = useToast();    const handleSave = async () => {
        if (!formData.content) return;
        setLoading(true);

        try {
            // Get final sentiment analysis
            const sentimentRes = await fetch('/api/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: formData.content }),
            });
            const sentimentData = await sentimentRes.json();

            const res = await fetch('/api/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    sentiment: sentimentData.sentiment || 'Neutral',
                    moodManuallySet,
                }),
            });

            if (res.ok) {
                await fetchEntries();
                showToast('Journal entry saved successfully!', 'success');
                // Reset form
                setFormData({ title: '', content: '', mood: '😐' });
                setMoodManuallySet(false);
            }
        } catch (error) {
            console.error('Failed to save journal', error);
            showToast('Failed to save journal entry.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectEntry = (entry: JournalEntry) => {
        setSelectedEntry(entry);
        setFormData({
            title: entry.title,
            content: entry.content,
            mood: entry.mood || '😐',
        });
        setMoodManuallySet(entry.moodManuallySet || false);
    };

    const handleNewEntry = () => {
        setSelectedEntry(null);
        setFormData({ title: '', content: '', mood: '😐' });
        setMoodManuallySet(false);
    };

    const handleMoodChange = (mood: string) => {
        setFormData({ ...formData, mood });
        setMoodManuallySet(true);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)]">
            <div className="flex-1 flex flex-col lg:flex-row gap-8 h-full">

                {/* Editor Section */}
                <div className="flex-[1.5] glass rounded-[2.5rem] shadow-xl flex flex-col overflow-hidden relative">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                        <div>
                            <h2 className="font-heading text-3xl font-bold text-secondary mb-1">Write Entry</h2>
                            <p className="text-foreground/60 text-sm font-medium">Express your thoughts freely</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-hover transition-all flex items-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
                            >
                                <Save size={18} /> {loading ? 'Saving...' : 'Save'}
                            </button>
                            <button className="p-3 bg-white rounded-xl border border-gray-200 text-gray-400 hover:text-error hover:border-error transition-colors">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6">
                        <input
                            type="text"
                            placeholder="Untitled Entry"
                            className="text-4xl font-heading font-bold bg-transparent border-none p-0 focus:outline-none placeholder:text-gray-300 text-secondary"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="bg-white/60 border border-white/40 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold text-secondary shadow-sm">
                                <Calendar size={16} className="text-primary" />
                                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                            </div>                            <div className="bg-white/60 border border-white/40 px-4 py-2 rounded-xl flex items-center gap-3 text-sm font-bold text-secondary shadow-sm">
                                <span>Mood:</span>
                                <div className="flex gap-1">
                                    {moods.map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => handleMoodChange(m)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg hover:scale-125 transition-transform ${formData.mood === m ? 'bg-white shadow-md scale-110' : 'opacity-50 hover:opacity-100'
                                                }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <textarea
                            placeholder="Start writing your thoughts here..."
                            className="flex-1 resize-none bg-transparent border-none p-0 focus:outline-none text-lg leading-loose text-foreground/80 placeholder:text-gray-300 min-h-[300px]"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        ></textarea>

                        <div className="bg-gradient-to-br from-surface-alt to-white rounded-2xl p-6 border border-white/50 shadow-sm">
                            <button
                                onClick={() => setShowAIAnalysis(!showAIAnalysis)}
                                className="flex items-center gap-3 w-full group"
                            >
                                <div className={`w-12 h-7 rounded-full relative transition-colors duration-300 ${showAIAnalysis ? 'bg-secondary' : 'bg-gray-200'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 shadow-sm transition-all duration-300 ${showAIAnalysis ? 'left-6' : 'left-1'}`}></div>
                                </div>
                                <span className="font-bold text-secondary flex items-center gap-2 group-hover:text-primary transition-colors">
                                    <Sparkles size={18} className={showAIAnalysis ? 'text-accent' : 'text-gray-400'} />
                                    AI Insights
                                    <span className="text-gray-400 font-normal text-sm">(Analyze emotional patterns)</span>
                                </span>
                            </button>

                            {showAIAnalysis && (
                                <div className="mt-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-sm leading-relaxed animate-fade-in relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
                                    <strong className="text-secondary block mb-2 font-heading text-lg">Analysis Result</strong>
                                    <p className="text-foreground/70">Your entry shows positive emotional progression. Key themes detected: <span className="font-semibold text-primary">progress</span>, <span className="font-semibold text-primary">self-care practices</span>. Consider exploring more structured relaxation techniques.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Entries List Section */}
                <div className="flex-1 glass rounded-[2.5rem] shadow-xl flex flex-col overflow-hidden h-full border border-white/40">
                    <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading text-xl font-bold text-secondary flex items-center gap-2">
                                Your Journal
                            </h2>
                            <button onClick={handleNewEntry} className="bg-secondary text-white p-2 rounded-xl hover:bg-secondary-hover transition-colors shadow-lg shadow-secondary/20">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="relative">
                            <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search entries..."
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-none shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-alt/30">
                        {entries.map((entry, i) => (
                            <div
                                key={entry._id}
                                onClick={() => handleSelectEntry(entry)}
                                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border hover:-translate-y-1 hover:shadow-md ${selectedEntry?._id === entry._id
                                    ? 'bg-white border-primary shadow-lg shadow-primary/5 ring-1 ring-primary'
                                    : 'bg-white/60 border-transparent hover:bg-white'
                                    } animate-slide-up`}
                                style={{ animationDelay: `${i * 0.05}s` }}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className={`font-bold truncate pr-2 text-lg ${selectedEntry?._id === entry._id ? 'text-primary' : 'text-secondary'}`}>
                                        {entry.title || 'Untitled Entry'}
                                    </h3>
                                    <span className="text-2xl filter drop-shadow-sm">{entry.mood || '😐'}</span>
                                </div>
                                <div className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                    {new Date(entry.createdAt).toLocaleDateString()}
                                </div>
                                <p className="text-sm line-clamp-2 text-foreground/60 leading-relaxed">
                                    {entry.content}
                                </p>
                            </div>
                        ))}

                        {entries.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📝</div>
                                <p className="font-medium">No entries yet. Start writing!</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
