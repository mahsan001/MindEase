import Link from 'next/link';
import { Lightbulb, Edit3, MessageSquare, BarChart2, Target } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h1 className="font-heading text-3xl font-semibold text-secondary mb-2">Welcome back, User</h1>
                <p className="text-lg text-gray-600">How are you feeling today? Let's continue your wellness journey.</p>
            </div>

            {/* Daily Tip */}
            <div className="bg-gradient-to-br from-primary to-primary-hover rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                    <Lightbulb size={28} />
                    <h2 className="font-heading text-2xl font-semibold">Daily Wellness Tip</h2>
                </div>
                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <strong className="block text-xl mb-2">Practice Gratitude Today</strong>
                    <p className="leading-relaxed opacity-95">
                        Take a moment to write down three things you're grateful for. Research shows that regular gratitude practice can significantly improve mental well-being and reduce stress. Start small - it could be as simple as a warm cup of coffee or a kind message from a friend.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div>
                <h2 className="font-heading text-xl font-semibold text-secondary mb-4">Your Progress</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:-translate-y-1 transition-transform">
                        <div className="font-heading text-4xl font-semibold text-primary mb-2">24</div>
                        <div className="text-gray-600 font-medium">Journal Entries</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:-translate-y-1 transition-transform">
                        <div className="font-heading text-4xl font-semibold text-primary mb-2">15</div>
                        <div className="text-gray-600 font-medium">Days Active</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm text-center hover:-translate-y-1 transition-transform">
                        <div className="font-heading text-4xl font-semibold text-primary mb-2">38</div>
                        <div className="text-gray-600 font-medium">AI Conversations</div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="font-heading text-xl font-semibold text-secondary mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/journal" className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 hover:-translate-y-1 hover:bg-background transition-all group cursor-pointer">
                        <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Edit3 size={24} />
                        </div>
                        <div>
                            <div className="font-heading font-semibold text-lg text-secondary mb-1">Write New Journal</div>
                            <div className="text-sm text-gray-600">Express your thoughts today</div>
                        </div>
                    </Link>

                    <Link href="/chat" className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 hover:-translate-y-1 hover:bg-background transition-all group cursor-pointer">
                        <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <div className="font-heading font-semibold text-lg text-secondary mb-1">Chat with AI</div>
                            <div className="text-sm text-gray-600">Start a conversation</div>
                        </div>
                    </Link>

                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 hover:-translate-y-1 hover:bg-background transition-all group cursor-pointer">
                        <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                            <BarChart2 size={24} />
                        </div>
                        <div>
                            <div className="font-heading font-semibold text-lg text-secondary mb-1">Track Your Mood</div>
                            <div className="text-sm text-gray-600">Log how you're feeling</div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5 hover:-translate-y-1 hover:bg-background transition-all group cursor-pointer">
                        <div className="w-14 h-14 bg-background rounded-xl flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Target size={24} />
                        </div>
                        <div>
                            <div className="font-heading font-semibold text-lg text-secondary mb-1">Set Daily Goal</div>
                            <div className="text-sm text-gray-600">Create wellness objectives</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
