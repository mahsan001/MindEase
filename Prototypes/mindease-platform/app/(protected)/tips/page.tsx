'use client';

import { useState } from 'react';
import { tipsData } from '@/data/tips';
import { Lightbulb, Filter, Search } from 'lucide-react';

export default function TipsPage() {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const categories = ['All', ...Array.from(new Set(tipsData.map(tip => tip.category)))];

    const filteredTips = tipsData.filter(tip => {
        const matchesCategory = filter === 'All' || tip.category === filter;
        const matchesSearch = tip.title.toLowerCase().includes(search.toLowerCase()) ||
            tip.content.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 w-full">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-8 md:mb-16 animate-fade-in px-4">
                    <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-xs md:text-sm font-bold text-accent mb-4 md:mb-6 uppercase tracking-wider">
                        <Lightbulb size={14} className="md:w-4 md:h-4" />
                        Daily Wisdom
                    </div>
                    <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4 md:mb-6">
                        Wellness Tips & Exercises
                    </h1>
                    <p className="text-base md:text-xl text-foreground/60 leading-relaxed">
                        Simple, actionable practices to improve your mental well-being, one day at a time.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${filter === cat
                                    ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                                    : 'bg-white text-secondary hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search size={18} className="absolute left-4 top-3.5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search tips..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border-none shadow-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Tips Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredTips.map((tip, index) => (
                        <div
                            key={tip.id}
                            className="group glass-card p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-500 animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-14 h-14 bg-surface-alt rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    {tip.icon}
                                </div>
                                <span className="px-3 py-1 rounded-lg bg-secondary/5 text-secondary text-xs font-bold uppercase tracking-wider">
                                    {tip.category}
                                </span>
                            </div>
                            <h3 className="font-heading text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                                {tip.title}
                            </h3>
                            <p className="text-foreground/70 leading-relaxed">
                                {tip.content}
                            </p>
                        </div>
                    ))}
                </div>

                {filteredTips.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">No tips found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
