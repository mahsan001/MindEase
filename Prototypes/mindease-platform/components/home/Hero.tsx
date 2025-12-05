import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-float"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 animate-float" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 animate-slide-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-medium text-secondary">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            AI-Powered Mental Wellness
                        </div>

                        <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold text-secondary leading-[1.1] tracking-tight text-balance">
                            Find your <br />
                            <span className="text-primary italic font-light">inner calm.</span>
                        </h1>

                        <p className="text-xl text-foreground/70 max-w-lg leading-relaxed">
                            Your personal sanctuary for mental clarity. Chat with our empathetic AI, track your moods, and journal your journey in a safe, private space.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="/register"
                                className="bg-secondary text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-secondary-hover transition-all transform hover:-translate-y-1 shadow-xl shadow-secondary/20 flex items-center gap-2 group"
                            >
                                Start Your Journey
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#features"
                                className="bg-white text-secondary border border-gray-200 px-8 py-4 rounded-2xl text-lg font-medium hover:border-secondary/30 hover:bg-gray-50 transition-all"
                            >
                                Learn More
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 pt-8 opacity-80">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <strong className="block text-secondary">Trusted by 10,000+ users</strong>
                                <span className="text-gray-500">4.9/5 Average Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <div className="relative hidden lg:block animate-scale-in" style={{ animationDelay: '0.2s' }}>
                        <div className="relative z-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-gray-100 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-surface-alt rounded-xl p-8 mb-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">🤖</div>
                                    <div>
                                        <div className="font-heading font-bold text-lg text-secondary">MindEase AI</div>
                                        <div className="text-sm text-gray-500">Therapy Assistant</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm text-sm leading-relaxed text-gray-600">
                                        Hello! I noticed you've been feeling a bit anxious lately. Would you like to try a quick breathing exercise?
                                    </div>
                                    <div className="bg-primary text-white p-4 rounded-xl rounded-tr-none shadow-sm text-sm leading-relaxed ml-auto max-w-[80%]">
                                        That sounds helpful. I've been overwhelmed with work deadlines.
                                    </div>
                                    <div className="bg-white p-4 rounded-xl rounded-tl-none shadow-sm text-sm leading-relaxed text-gray-600">
                                        I understand. Let's take it one step at a time. Breathe in for 4 seconds... hold for 4... and exhale for 4.
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center px-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="text-xs font-mono text-gray-400">Live Session</div>
                            </div>
                        </div>

                        {/* Decorative Elements behind card */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
