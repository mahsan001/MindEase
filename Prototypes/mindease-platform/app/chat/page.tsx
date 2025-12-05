'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Send, User, Bot, MoreVertical, Phone, MessageCircle, FileText, Heart, Zap } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    time: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showStarters, setShowStarters] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const addMessage = (text: string, sender: 'user' | 'ai') => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newMessage]);
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        setShowStarters(false);
        addMessage(text, 'user');
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text }),
            });
            const data = await res.json();
            addMessage(data.reply, 'ai');
        } catch (error) {
            addMessage("I'm having trouble connecting right now. Please try again.", 'ai');
        } finally {
            setLoading(false);
        }
    };

    const startConversation = (type: string) => {
        const starters: Record<string, string> = {
            anxious: "I've been feeling really anxious lately.",
            down: "I'm feeling down and don't know why.",
            stressed: "I'm really stressed about work deadlines.",
            talk: "I just need someone to talk to right now."
        };
        handleSendMessage(starters[type]);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 max-w-[1400px] mx-auto w-full p-6 flex gap-6 h-[calc(100vh-80px)]">
                {/* Main Chat Area */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-gradient-to-r from-primary to-primary-hover p-6 flex justify-between items-center text-white">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center text-2xl shadow-sm">
                                <Bot size={28} />
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-lg">MindEase AI Therapist</h3>
                                <div className="flex items-center gap-2 text-sm opacity-90">
                                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                                    Online - Always here to listen
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => { setMessages([]); setShowStarters(true); }}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
                            >
                                New Chat
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 bg-[#F5E6D3]/30">
                        {showStarters ? (
                            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                                <h2 className="font-heading text-2xl font-semibold text-secondary mb-8">How can I support you today?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <button onClick={() => startConversation('anxious')} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">😟</div>
                                        <div className="font-medium text-secondary">I'm feeling anxious</div>
                                    </button>
                                    <button onClick={() => startConversation('down')} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">😔</div>
                                        <div className="font-medium text-secondary">I'm feeling down</div>
                                    </button>
                                    <button onClick={() => startConversation('stressed')} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">😤</div>
                                        <div className="font-medium text-secondary">I'm stressed about work</div>
                                    </button>
                                    <button onClick={() => startConversation('talk')} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left group">
                                        <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">💭</div>
                                        <div className="font-medium text-secondary">Just need to talk</div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === 'ai' ? 'bg-primary text-white' : 'bg-[#8B7AA8] text-white'
                                            }`}>
                                            {msg.sender === 'ai' ? <Bot size={20} /> : <User size={20} />}
                                        </div>
                                        <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${msg.sender === 'ai' ? 'bg-white text-secondary' : 'bg-[#8B7AA8] text-white'
                                            }`}>
                                            <p className="leading-relaxed">{msg.text}</p>
                                            <span className={`text-xs mt-2 block ${msg.sender === 'ai' ? 'text-gray-400' : 'text-white/70'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <Bot size={20} />
                                        </div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-2">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                                placeholder="Type your message here... Share whatever's on your mind"
                                className="flex-1 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                            />
                            <button
                                onClick={() => handleSendMessage(input)}
                                disabled={!input.trim() || loading}
                                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Send <Send size={18} />
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                            <span className="text-primary">🔒</span> Your conversation is private and secure. MindEase AI is not a replacement for professional therapy.
                        </p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-80 hidden lg:block space-y-6 overflow-y-auto">
                    {/* Quick Tips */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h4 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                            <Zap size={20} className="text-yellow-500" /> Quick Tips
                        </h4>
                        <div className="space-y-3">
                            <div className="bg-background p-4 rounded-lg">
                                <strong className="block text-secondary mb-1">Be Open & Honest</strong>
                                <p className="text-sm text-gray-600">Share your true feelings. This is a judgment-free space.</p>
                            </div>
                            <div className="bg-background p-4 rounded-lg">
                                <strong className="block text-secondary mb-1">Take Your Time</strong>
                                <p className="text-sm text-gray-600">There's no rush. Respond when you're ready.</p>
                            </div>
                        </div>
                    </div>

                    {/* Wellness Exercises */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h4 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                            <Heart size={20} className="text-pink-500" /> Try These
                        </h4>
                        <div className="space-y-2">
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-background rounded-lg transition-colors text-left text-gray-600 hover:text-primary">
                                <span className="text-xl">🫁</span> 5-Minute Breathing
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-background rounded-lg transition-colors text-left text-gray-600 hover:text-primary">
                                <span className="text-xl">📝</span> Thought Journaling
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 hover:bg-background rounded-lg transition-colors text-left text-gray-600 hover:text-primary">
                                <span className="text-xl">🎯</span> Grounding Techniques
                            </button>
                        </div>
                    </div>

                    {/* Crisis Resources */}
                    <div className="bg-gradient-to-br from-[#8B7AA8] to-[#75679A] rounded-xl p-6 text-white shadow-sm text-center">
                        <h4 className="font-heading font-semibold text-lg mb-4">🆘 Need Immediate Help?</h4>
                        <div className="space-y-4 text-sm opacity-95">
                            <div>
                                <strong className="block mb-1">Crisis Helpline:</strong>
                                <div className="font-mono bg-white/10 py-1 rounded">1-800-273-8255</div>
                            </div>
                            <div>
                                <strong className="block mb-1">Text Support:</strong>
                                <div className="font-mono bg-white/10 py-1 rounded">Text "HELLO" to 741741</div>
                            </div>
                            <p className="text-xs mt-4 opacity-80">Available 24/7 for emergencies</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
