'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, MessageCircle, Phone, Book, Lightbulb, Shield, Heart, MessageSquare } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const faqs: FAQItem[] = [
        {
            category: 'Getting Started',
            question: 'How do I create my first journal entry?',
            answer: 'Navigate to "My Journals" from the sidebar, then click the "Write New Entry" button. You can start typing your thoughts, and our AI will automatically analyze the sentiment and suggest a mood based on your writing. You can also manually select a mood using the emoji buttons.'
        },
        {
            category: 'Getting Started',
            question: 'What is the AI Therapist and how does it work?',
            answer: 'The AI Therapist is an intelligent chatbot trained to provide supportive, empathetic responses to your mental health concerns. It uses advanced natural language processing to understand your emotions and provide helpful guidance. Click on "AI Therapist" in the sidebar to start a conversation.'
        },
        {
            category: 'Getting Started',
            question: 'How do I track my mood over time?',
            answer: 'Visit the "Mood Tracker" page to see a visual representation of your moods organized by day and time of day (morning, afternoon, evening). Each mood entry from your journals is automatically plotted, helping you identify patterns and trends in your emotional well-being.'
        },
        {
            category: 'Features',
            question: 'What are Daily Tips?',
            answer: 'Daily Tips are curated mental wellness advice, mindfulness exercises, and self-care recommendations. They\'re organized by category (Mindfulness, Self-Care, Relationships, etc.) and updated regularly. Visit the "Daily Tips" section to explore them.'
        },
        {
            category: 'Features',
            question: 'How does sentiment analysis work?',
            answer: 'As you type your journal entry, our AI analyzes the emotional tone of your writing in real-time using Natural Language Processing (NLP). It detects positive, negative, or neutral sentiments and suggests an appropriate mood emoji. You can always override this with your own mood selection.'
        },
        {
            category: 'Features',
            question: 'What are AI Insights in my journal?',
            answer: 'AI Insights provide personalized analysis of your journal entry once you\'ve written at least 20 characters. The AI examines your writing patterns, emotional keywords, reflection depth, and overall sentiment to provide actionable recommendations and observations.'
        },
        {
            category: 'Privacy & Security',
            question: 'Is my journal data private and secure?',
            answer: 'Absolutely. Your journal entries are encrypted and stored securely. Only you have access to your personal data. We use industry-standard security protocols including JWT authentication and secure database connections. You can export or delete all your data at any time from Settings.'
        },
        {
            category: 'Privacy & Security',
            question: 'Can I delete my account and data?',
            answer: 'Yes, you have full control over your data. Go to Settings > Data & Account, and you\'ll find options to export all your data or permanently delete your account. Account deletion is irreversible and removes all associated data.'
        },
        {
            category: 'Privacy & Security',
            question: 'Who can see my conversations with the AI Therapist?',
            answer: 'Your conversations are completely private. They\'re stored securely and are only accessible to you. We do not share, sell, or use your personal conversations for any purpose other than providing you with the service.'
        },
        {
            category: 'Account Management',
            question: 'How do I change my password?',
            answer: 'Go to Settings > Security, where you can update your password. You\'ll need to enter your current password for verification, then set a new password (minimum 6 characters).'
        },
        {
            category: 'Account Management',
            question: 'How do I update my profile information?',
            answer: 'Visit Settings > Profile to update your name and email address. Make sure to save your changes after editing.'
        },
        {
            category: 'Account Management',
            question: 'Can I export my journal data?',
            answer: 'Yes! Go to Settings > Data & Account and click "Export Data". You\'ll receive a JSON file containing all your journal entries, mood data, and account information with timestamps.'
        },
        {
            category: 'Troubleshooting',
            question: 'The AI Therapist isn\'t responding. What should I do?',
            answer: 'First, check your internet connection. If the issue persists, try refreshing the page. Make sure you\'re logged in and your session hasn\'t expired. If problems continue, contact our support team.'
        },
        {
            category: 'Troubleshooting',
            question: 'My mood isn\'t being saved with my journal entry',
            answer: 'Make sure you\'ve either clicked on a mood emoji manually or allowed the automatic sentiment analysis to complete (it analyzes as you type). If you\'ve manually set a mood, the auto-detection will stop to preserve your choice.'
        },
        {
            category: 'Troubleshooting',
            question: 'I can\'t see my old journal entries',
            answer: 'Go to "My Journals" and scroll down to see all your entries in reverse chronological order (newest first). Use the search function if you\'re looking for specific content. If entries are truly missing, contact support immediately.'
        }
    ];

    const categories = ['all', 'Getting Started', 'Features', 'Privacy & Security', 'Account Management', 'Troubleshooting'];

    const filteredFAQs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const quickLinks = [
        { icon: Book, title: 'User Guide', description: 'Learn how to use MindEase effectively', href: '#guide' },
        { icon: MessageSquare, title: 'AI Therapist Tips', description: 'Get the most out of AI conversations', href: '#ai-tips' },
        { icon: Shield, title: 'Privacy Policy', description: 'Understand how we protect your data', href: '#privacy' },
        { icon: Heart, title: 'Mental Health Resources', description: 'External support and crisis helplines', href: '#resources' },
    ];    const contactMethods = [
        { icon: Mail, title: 'Email Support', detail: 'support@mindease.pk', description: 'Response within 24 hours' },
        { icon: MessageCircle, title: 'Live Chat', detail: 'Available 9 AM - 6 PM PKT', description: 'Chat with our support team' },
        { icon: Phone, title: 'Phone Support', detail: '+92 21 3456 7890', description: 'Mon-Fri, 9 AM - 5 PM PKT' },
    ];    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">Help & Support</h1>
                <p className="text-muted-foreground text-sm md:text-base">Find answers to common questions and get support</p>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quickLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                        <a
                            key={index}
                            href={link.href}
                            className="p-5 bg-white rounded-xl border border-gray-100 hover:border-secondary hover:shadow-lg transition-all group"
                        >
                            <Icon className="text-secondary mb-3 group-hover:scale-110 transition-transform" size={28} />
                            <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                        </a>
                    );
                })}
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for answers..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                            selectedCategory === category
                                ? 'bg-secondary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        {category === 'all' ? 'All Topics' : category}
                    </button>
                ))}
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-heading font-bold text-secondary">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground mt-1">
                        {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} found
                    </p>
                </div>
                <div className="divide-y divide-gray-100">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <div key={index} className="p-6">                                <button
                                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                    className="w-full flex items-start justify-between text-left group"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
                                                {faq.category}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-secondary transition-colors">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className="ml-4 shrink-0">
                                        {expandedFAQ === index ? (
                                            <ChevronUp className="text-secondary" size={20} />
                                        ) : (
                                            <ChevronDown className="text-gray-400 group-hover:text-secondary transition-colors" size={20} />
                                        )}
                                    </div>
                                </button>
                                {expandedFAQ === index && (
                                    <div className="mt-4 pl-4 border-l-2 border-secondary/20">
                                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-muted-foreground">No questions found matching your search.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="mt-4 text-secondary font-medium hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-8 mb-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-heading font-bold text-secondary mb-2">Still need help?</h2>
                    <p className="text-muted-foreground">Our support team is here to assist you</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactMethods.map((method, index) => {
                        const Icon = method.icon;
                        return (
                            <div key={index} className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-4">
                                    <Icon className="text-secondary" size={24} />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                                <p className="text-secondary font-medium mb-1">{method.detail}</p>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>            {/* Additional Resources */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                    <div className="shrink-0">
                        <Lightbulb className="text-amber-500" size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">Mental Health Crisis?</h3>
                        <p className="text-muted-foreground mb-4">
                            If you&apos;re experiencing a mental health emergency, please reach out to a crisis helpline immediately.
                        </p>
                        <div className="space-y-2 text-sm">
                            <div>
                                <strong className="text-gray-900">Umang Pakistan Mental Health Helpline:</strong>{' '}
                                <a href="tel:0800-00-444" className="text-secondary hover:underline font-medium">0800-00-444</a>
                                <span className="text-gray-600"> (Toll-free)</span>
                            </div>
                            <div>
                                <strong className="text-gray-900">Rozan Counseling Helpline:</strong>{' '}
                                <a href="tel:+92-42-35761999" className="text-secondary hover:underline font-medium">+92-42-35761999</a>
                            </div>
                            <div>
                                <strong className="text-gray-900">Pakistan Mental Health Helpline:</strong>{' '}
                                <a href="tel:+92-300-0552-800" className="text-secondary hover:underline font-medium">+92-300-0552-800</a>
                            </div>
                            <div>
                                <strong className="text-gray-900">Emergency Services:</strong>{' '}
                                <a href="tel:1122" className="text-secondary hover:underline font-medium">1122</a>
                                <span className="text-gray-600"> (Medical Emergency)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Guide Section */}
            <div id="guide" className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-heading font-bold text-secondary mb-6">Quick Start Guide</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-secondary text-white text-sm rounded-full">1</span>
                            Create Your First Journal Entry
                        </h3>
                        <p className="text-muted-foreground pl-8">
                            Navigate to &quot;My Journals&quot; and click the write icon. Start typing your thoughts and feelings. 
                            The AI will analyze your sentiment in real-time and suggest a mood.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-secondary text-white text-sm rounded-full">2</span>
                            Chat with the AI Therapist
                        </h3>
                        <p className="text-muted-foreground pl-8">
                            Click &quot;AI Therapist&quot; in the sidebar to start a supportive conversation. Share what&apos;s on your mind 
                            and receive empathetic, helpful responses.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-secondary text-white text-sm rounded-full">3</span>
                            Track Your Mood Patterns
                        </h3>
                        <p className="text-muted-foreground pl-8">
                            Visit &quot;Mood Tracker&quot; to visualize your emotional journey. See how your moods change throughout 
                            the day and identify patterns over time.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 bg-secondary text-white text-sm rounded-full">4</span>
                            Explore Daily Tips
                        </h3>
                        <p className="text-muted-foreground pl-8">
                            Browse curated mental wellness tips in the &quot;Daily Tips&quot; section. Find advice on mindfulness, 
                            self-care, relationships, and more.
                        </p>                    </div>
                </div>
            </div>

            {/* AI Therapist Tips Section */}
            <div id="ai-tips" className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="text-secondary" size={32} />
                    <h2 className="text-2xl font-heading font-bold text-secondary">AI Therapist Tips</h2>
                </div>
                <p className="text-muted-foreground mb-6">
                    Get the most out of your conversations with our AI Therapist by following these helpful tips.
                </p>
                
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            💬 Be Open and Honest
                        </h3>
                        <p className="text-muted-foreground">
                            The AI works best when you share your genuine thoughts and feelings. Don&apos;t worry about being judged - 
                            the AI is here to provide a safe, confidential space for you to express yourself.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            📝 Provide Context
                        </h3>
                        <p className="text-muted-foreground">
                            Share relevant details about your situation. The more context you provide about what you&apos;re experiencing, 
                            the better the AI can understand and provide helpful guidance tailored to your specific needs.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            🎯 Be Specific About Your Goals
                        </h3>
                        <p className="text-muted-foreground">
                            Let the AI know what you&apos;re hoping to achieve. Whether it&apos;s managing anxiety, processing emotions, 
                            or developing coping strategies, stating your goals helps the AI provide more targeted support.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            ⏰ Take Your Time
                        </h3>
                        <p className="text-muted-foreground">
                            There&apos;s no rush in your conversations. Take time to think about your responses and reflect on the AI&apos;s 
                            suggestions. Meaningful therapeutic progress often comes from thoughtful, unhurried dialogue.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            🔄 Ask for Clarification
                        </h3>
                        <p className="text-muted-foreground">
                            If the AI&apos;s response doesn&apos;t quite address your concern or if something is unclear, ask follow-up 
                            questions. The AI is designed to engage in back-and-forth dialogue to better understand and help you.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-rose-50 to-red-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            👤 Remember It&apos;s a Tool
                        </h3>
                        <p className="text-muted-foreground">
                            While our AI Therapist is sophisticated and helpful, it&apos;s designed to complement, not replace, 
                            professional mental health care. For serious mental health concerns, please consult with a licensed therapist.
                        </p>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-secondary/5 rounded-xl border-l-4 border-secondary">
                    <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> Regular conversations with the AI Therapist, combined with journaling and mood tracking, 
                        create a comprehensive mental wellness routine that can significantly improve your emotional well-being over time.
                    </p>
                </div>
            </div>

            {/* Privacy Policy Section */}
            <div id="privacy" className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="text-secondary" size={32} />
                    <h2 className="text-2xl font-heading font-bold text-secondary">Privacy Policy</h2>
                </div>
                <p className="text-muted-foreground mb-8">
                    Your privacy is our top priority. Here&apos;s how we protect and handle your personal information.
                </p>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🔐 Data Security</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• All data is encrypted both in transit (using SSL/TLS) and at rest</p>
                            <p>• We use industry-standard JWT authentication to secure your account</p>
                            <p>• Your passwords are hashed using bcrypt with salt for maximum security</p>
                            <p>• We employ regular security audits and updates to protect against vulnerabilities</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 What Data We Collect</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• <strong>Account Information:</strong> Name, email address, and password (hashed)</p>
                            <p>• <strong>Journal Entries:</strong> Your written content, mood selections, and timestamps</p>
                            <p>• <strong>AI Conversations:</strong> Your chat history with the AI Therapist</p>
                            <p>• <strong>Usage Data:</strong> Features you use, timestamps, and general usage patterns</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 How We Use Your Data</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• To provide and improve our mental wellness services</p>
                            <p>• To analyze sentiment and generate personalized insights</p>
                            <p>• To track your mood patterns and provide meaningful visualizations</p>
                            <p>• To improve our AI models and user experience (with anonymized data only)</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🚫 What We DON&apos;T Do</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• We <strong>never</strong> sell your personal data to third parties</p>
                            <p>• We <strong>never</strong> share your journal entries or conversations without your consent</p>
                            <p>• We <strong>never</strong> use your identifiable data for advertising purposes</p>
                            <p>• We <strong>never</strong> access your data without legitimate security or support reasons</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Your Rights</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• <strong>Access:</strong> View all your personal data at any time</p>
                            <p>• <strong>Export:</strong> Download your complete data in JSON format (Settings → Data & Account)</p>
                            <p>• <strong>Delete:</strong> Permanently delete your account and all associated data</p>
                            <p>• <strong>Opt-out:</strong> Control data sharing and analytics tracking in Settings → Privacy</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🍪 Cookies & Tracking</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• We use essential cookies for authentication (JWT tokens)</p>
                            <p>• Optional analytics cookies to improve user experience (can be disabled)</p>
                            <p>• No third-party advertising or tracking cookies</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">📧 Data Retention</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• Your data is retained as long as your account is active</p>
                            <p>• Upon account deletion, all data is permanently removed within 30 days</p>
                            <p>• Backup copies are securely deleted according to our retention schedule</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">🌍 International Transfers</h3>
                        <div className="pl-4 space-y-2 text-muted-foreground">
                            <p>• Your data is primarily stored in secure servers located in Pakistan</p>
                            <p>• Any international data transfers comply with applicable privacy laws</p>
                            <p>• We ensure adequate safeguards are in place for cross-border data protection</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h4 className="font-semibold text-gray-900 mb-2">Questions About Privacy?</h4>
                    <p className="text-sm text-gray-700 mb-3">
                        If you have any questions about how we handle your data or want to exercise your privacy rights, 
                        please contact us at <a href="mailto:privacy@mindease.pk" className="text-secondary hover:underline font-medium">privacy@mindease.pk</a>
                    </p>
                    <p className="text-xs text-gray-600">Last updated: December 17, 2025</p>
                </div>
            </div>

            {/* Mental Health Resources Section */}
            <div id="resources" className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                    <Heart className="text-secondary" size={32} />
                    <h2 className="text-2xl font-heading font-bold text-secondary">Mental Health Resources</h2>
                </div>
                <p className="text-muted-foreground mb-8">
                    Access external support services, crisis helplines, and educational resources for mental health in Pakistan.
                </p>

                <div className="space-y-6">
                    {/* Crisis Helplines */}
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center gap-2">
                            🚨 Crisis Helplines (24/7)
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Phone className="text-red-600 shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-medium text-gray-900">Umang Pakistan Mental Health Helpline</p>
                                    <a href="tel:0800-00-444" className="text-red-600 hover:underline font-semibold">0800-00-444</a>
                                    <p className="text-sm text-gray-600">Toll-free mental health support available in multiple languages</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-red-600 shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-medium text-gray-900">Pakistan Mental Health Helpline</p>
                                    <a href="tel:+92-300-0552-800" className="text-red-600 hover:underline font-semibold">+92-300-0552-800</a>
                                    <p className="text-sm text-gray-600">Professional counseling and crisis intervention</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="text-red-600 shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="font-medium text-gray-900">Emergency Medical Services</p>
                                    <a href="tel:1122" className="text-red-600 hover:underline font-semibold">1122</a>
                                    <p className="text-sm text-gray-600">For immediate medical emergencies</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mental Health Organizations */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🏥 Mental Health Organizations in Pakistan</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2">Rozan</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Leading organization working on emotional and psychological well-being
                                </p>
                                <p className="text-sm">
                                    📞 <a href="tel:+92-42-35761999" className="text-secondary hover:underline">+92-42-35761999</a>
                                </p>
                                <p className="text-sm">
                                    🌐 <a href="https://rozan.org" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">rozan.org</a>
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2">Taskeen Health Initiative</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Mental health awareness and support services
                                </p>
                                <p className="text-sm">
                                    📞 <a href="tel:+92-21-35344791" className="text-secondary hover:underline">+92-21-35344791</a>
                                </p>
                                <p className="text-sm">
                                    🌐 <a href="https://taskeen.org" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">taskeen.org</a>
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2">Pakistan Association for Mental Health (PAMH)</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Mental health advocacy and awareness programs
                                </p>
                                <p className="text-sm">
                                    📧 <a href="mailto:info@pamh.org.pk" className="text-secondary hover:underline">info@pamh.org.pk</a>
                                </p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2">Fountain House</h4>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Rehabilitation center for mental health recovery
                                </p>
                                <p className="text-sm">
                                    📞 <a href="tel:+92-42-35312555" className="text-secondary hover:underline">+92-42-35312555</a>
                                </p>
                                <p className="text-sm">
                                    🌐 <a href="https://fountainhouse.org.pk" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">fountainhouse.org.pk</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Educational Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Educational Resources</h3>
                        <div className="space-y-3">
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2">Understanding Mental Health</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Learn about common mental health conditions, symptoms, and treatment options.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Depression</span>
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Anxiety</span>
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Stress Management</span>
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">PTSD</span>
                                </div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl">
                                <h4 className="font-semibold text-gray-900 mb-2">Self-Care Practices</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Explore evidence-based self-care techniques and mindfulness exercises.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Meditation</span>
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Breathing Exercises</span>
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Journaling</span>
                                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700">Sleep Hygiene</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Support Groups */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">👥 Support Groups & Communities</h3>
                        <div className="bg-purple-50 p-6 rounded-xl">
                            <p className="text-muted-foreground mb-4">
                                Connecting with others who understand your experiences can be incredibly healing. Consider joining:
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    <span>Local support groups for specific conditions (depression, anxiety, grief)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    <span>Online communities for mental health support and sharing experiences</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    <span>Peer support programs where you can both give and receive support</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-secondary">•</span>
                                    <span>Family support groups for those caring for loved ones with mental health challenges</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Professional Help */}
                    <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6 rounded-xl border border-secondary/20">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">💼 When to Seek Professional Help</h3>
                        <p className="text-muted-foreground mb-4">
                            While MindEase is a valuable tool for mental wellness, professional help is recommended if you experience:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-700 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                <span>Persistent feelings of sadness, hopelessness, or worthlessness</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                <span>Thoughts of self-harm or suicide</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                <span>Severe anxiety that interferes with daily life</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                <span>Difficulty functioning at work, school, or in relationships</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-secondary">•</span>
                                <span>Trauma or abuse that you&apos;re struggling to process</span>
                            </li>
                        </ul>
                        <p className="text-sm text-gray-700 font-medium">
                            Contact a licensed mental health professional, psychiatrist, or psychologist for comprehensive evaluation and treatment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
