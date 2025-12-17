import { Shield, Clock, Heart } from 'lucide-react';

export default function Trust() {
    return (
        <section className="py-32 px-6 bg-white" id="about">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-block px-4 py-2 rounded-full bg-secondary/5 border border-secondary/10 shadow-sm text-sm font-bold text-secondary mb-6 uppercase tracking-wider">
                            Our Promise
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
                            Why Choose <br />MindEase?
                        </h2>
                        <p className="text-xl text-foreground/70 leading-relaxed mb-10">
                            We believe that mental health support should be accessible, private, and stigma-free. Our platform is built with these core values at heart.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                    <Shield size={28} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-secondary mb-2">100% Private & Secure</h3>
                                    <p className="text-foreground/60 leading-relaxed">Your conversations and journals are encrypted. We never share your personal data with third parties.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                                    <Clock size={28} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-secondary mb-2">Available 24/7</h3>
                                    <p className="text-foreground/60 leading-relaxed">Get support whenever you need it, day or night. No appointments, no waiting rooms.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-14 h-14 bg-error/10 rounded-2xl flex items-center justify-center text-error shrink-0">
                                    <Heart size={28} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-xl text-secondary mb-2">Judgment-Free Zone</h3>
                                    <p className="text-foreground/60 leading-relaxed">A safe space to be yourself without fear or stigma. Express your true feelings freely.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[3rem] blur-3xl -z-10 transform rotate-6"></div>
                        <div className="bg-surface-alt rounded-[3rem] p-12 relative overflow-hidden border border-white/50 shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <blockquote className="relative z-10">
                                <span className="text-8xl text-primary/20 font-heading font-bold absolute -top-10 -left-4">"</span>
                                <p className="font-heading text-3xl md:text-4xl font-bold text-secondary leading-tight mb-8">
                                    MindEase has completely changed how I manage my anxiety. It's like having a supportive friend in my pocket 24/7.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-lg">S</div>
                                    <div>
                                        <div className="font-bold text-secondary">Sarah M.</div>
                                        <div className="text-sm text-foreground/60">MindEase User since 2024</div>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
