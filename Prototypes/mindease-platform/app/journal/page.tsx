'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Edit3, Trash2, Save, Plus, Search, Filter, Sparkles } from 'lucide-react';

interface JournalEntry {
    _id: string;
    title: string;
    content: string;
    mood: string;
    createdAt: string;
    sentiment?: string;
}

export default function JournalPage() {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
    const [isEditing, setIsEditing] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        mood: '😐',
    });
    const [showAIAnalysis, setShowAIAnalysis] = useState(false);
    const [loading, setLoading] = useState(false);

    const moods = ['😢', '😟', '😐', '😊', '😄'];

    useEffect(() => {
        fetchEntries();
    }, []);

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

    const handleSave = async () => {
        if (!formData.content) return;
        setLoading(true);

        try {
            const res = await fetch('/api/journal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    sentiment: 'Neutral', // Placeholder for actual sentiment analysis
                }),
            });

            if (res.ok) {
                await fetchEntries();
                alert('✅ Journal entry saved successfully!');
                // Reset form
                setFormData({ title: '', content: '', mood: '😐' });
            }
        } catch (error) {
            console.error('Failed to save journal', error);
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
        setIsEditing(true);
    };

    const handleNewEntry = () => {
        setSelectedEntry(null);
        setFormData({ title: '', content: '', mood: '😐' });
        setIsEditing(true);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-[1400px] mx-auto w-full p-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-80px)]">

                {/* Editor Section */}
                <div className="flex-[1.5] bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-primary-hover p-6 text-white">
                        <div className="flex items-center gap-3 mb-1">
                            <Edit3 size={24} />
                            <h2 className="font-heading text-2xl font-semibold">Write Your Journal Entry</h2>
                        </div>
                        <p className="opacity-90">Express your thoughts freely in this private space</p>
                    </div>

                    <div className="bg-[#F5E6D3] px-6 py-3 flex gap-3 border-b border-gray-200 overflow-x-auto">
                        <button className="p-2 bg-white rounded hover:text-primary transition-colors font-bold">B</button>
                        <button className="p-2 bg-white rounded hover:text-primary transition-colors italic">I</button>
                        <button className="p-2 bg-white rounded hover:text-primary transition-colors underline">U</button>
                        <div className="w-px h-8 bg-gray-300 mx-1"></div>
                        <button className="p-2 bg-white rounded hover:text-primary transition-colors text-sm">List</button>
                        <button className="p-2 bg-white rounded hover:text-primary transition-colors text-sm">Link</button>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                        <input
                            type="text"
                            placeholder="Entry Title (Optional)"
                            className="text-2xl font-heading font-semibold border-2 border-gray-100 rounded-lg p-4 focus:outline-none focus:border-primary transition-colors"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="bg-[#F5E6D3] px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                                <span>📅 Date:</span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            <div className="bg-[#F5E6D3] px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                                <span>😊 Mood:</span>
                                <div className="flex gap-2">
                                    {moods.map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setFormData({ ...formData, mood: m })}
                                            className={`w-8 h-8 flex items-center justify-center rounded bg-white hover:scale-110 transition-transform ${formData.mood === m ? 'ring-2 ring-primary' : ''
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
                            className="flex-1 resize-none border-2 border-gray-100 rounded-lg p-4 focus:outline-none focus:border-primary transition-colors leading-relaxed min-h-[300px]"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        ></textarea>

                        <div className="bg-[#F5E6D3] rounded-xl p-4">
                            <button
                                onClick={() => setShowAIAnalysis(!showAIAnalysis)}
                                className="flex items-center gap-3 w-full"
                            >
                                <div className={`w-12 h-6 rounded-full relative transition-colors ${showAIAnalysis ? 'bg-primary' : 'bg-gray-300'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${showAIAnalysis ? 'left-6.5' : 'left-0.5'}`}></div>
                                </div>
                                <span className="font-medium text-secondary flex items-center gap-2">
                                    <Sparkles size={16} /> Enable AI Analysis <span className="text-gray-500 font-normal text-sm">(Optional)</span>
                                </span>
                            </button>

                            {showAIAnalysis && (
                                <div className="mt-4 bg-white p-4 rounded-lg text-sm leading-relaxed animate-in fade-in slide-in-from-top-2">
                                    <strong className="text-primary block mb-2">🤖 AI Insights:</strong>
                                    Your entry shows positive emotional progression. Key themes detected: progress, self-care practices. Consider exploring more structured relaxation techniques.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 bg-[#F5E6D3] border-t border-gray-200 flex justify-between items-center">
                        <div className="flex gap-3">
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-all flex items-center gap-2 disabled:opacity-70"
                            >
                                <Save size={18} /> {loading ? 'Saving...' : 'Save Entry'}
                            </button>
                            <button
                                onClick={handleNewEntry}
                                className="bg-white text-secondary border-2 border-gray-200 px-6 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
                            >
                                Clear
                            </button>
                        </div>
                        <button className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium">
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>

                {/* Entries List Section */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden h-full">
                    <div className="bg-gradient-to-r from-[#8B7AA8] to-[#75679A] p-6 text-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-heading text-xl font-semibold flex items-center gap-2">
                                <span>📚</span> Your Journal Entries
                            </h2>
                            <button onClick={handleNewEntry} className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search entries..."
                                    className="w-full pl-9 pr-4 py-2 rounded-lg text-sm text-secondary focus:outline-none"
                                />
                            </div>
                            <button className="bg-white/20 hover:bg-white/30 px-3 rounded-lg flex items-center gap-1 text-sm font-medium transition-colors">
                                <Filter size={16} /> Filter
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {entries.map((entry) => (
                            <div
                                key={entry._id}
                                onClick={() => handleSelectEntry(entry)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border-2 hover:border-[#8B7AA8] hover:translate-x-1 ${selectedEntry?._id === entry._id
                                        ? 'bg-[#8B7AA8] text-white border-[#8B7AA8]'
                                        : 'bg-[#F5E6D3] border-transparent'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold truncate pr-2">{entry.title || 'Untitled Entry'}</h3>
                                    <span className="text-xl">{entry.mood || '😐'}</span>
                                </div>
                                <div className={`text-xs mb-2 ${selectedEntry?._id === entry._id ? 'text-white/80' : 'text-gray-500'}`}>
                                    📅 {new Date(entry.createdAt).toLocaleDateString()}
                                </div>
                                <p className={`text-sm line-clamp-2 ${selectedEntry?._id === entry._id ? 'text-white/90' : 'text-gray-600'}`}>
                                    {entry.content}
                                </p>
                            </div>
                        ))}

                        {entries.length === 0 && (
                            <div className="text-center py-10 text-gray-500">
                                <p>No entries yet. Start writing!</p>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-[#F5E6D3] border-t border-gray-200 text-center text-sm font-medium text-gray-600">
                        {entries.length} Total Entries • Last 30 Days
                    </div>
                </div>

            </div>
        </div>
    );
}
