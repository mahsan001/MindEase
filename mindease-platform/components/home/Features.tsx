import { MessageSquare, Book, Lightbulb, Lock, BarChart2, Heart } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: MessageSquare,
            title: "AI Therapy Chatbot",
            description: "Chat with our supportive AI therapist anytime. Get immediate, empathetic responses to your thoughts and feelings.",
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            icon: Book,
            title: "Private Journaling",
            description: "Write and store your thoughts securely. Express yourself freely in a safe, private space with AI insights.",
            color: "text-secondary",
            bg: "bg-secondary/10"
        },
        {
            icon: Lightbulb,
            title: "Daily Wellness Tips",
            description: "Receive personalized tips, reminders, and exercises to improve your mental health every day.",
            color: "text-accent",
            bg: "bg-accent/10"
        },
        {
            icon: Lock,
            title: "Complete Privacy",
            description: "Your data is yours. We prioritize your privacy with secure storage and no unauthorized access.",
            color: "text-success",
            bg: "bg-success/10"
        },
        {
            icon: BarChart2,
            title: "Mood Tracking",
            description: "Monitor your emotional patterns over time with visual insights and progress tracking.",
            color: "text-primary",
            bg: "bg-primary/10"
        },
        {
            icon: Heart,
            title: "Free Access",
            description: "No subscriptions, no hidden fees. Mental health support should be accessible to everyone.",
            color: "text-error",
            bg: "bg-error/10"
        }
    ];

    return (
        <section className="py-32 px-6 relative overflow-hidden" id="features">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <div className="inline-block px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-bold text-secondary mb-4 uppercase tracking-wider">
                        Why MindEase?
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6 leading-tight">
                        Tools for your <span className="text-primary italic font-light">mental wellness.</span>
                    </h2>
                    <p className="text-xl text-foreground/60 leading-relaxed">
                        Everything you need to find balance, track your progress, and feel heard—all in one secure place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group glass-card p-10 rounded-[2rem] hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className={`w-16 h-16 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                <feature.icon size={32} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-4 text-secondary group-hover:text-primary transition-colors">{feature.title}</h3>
                            <p className="text-foreground/70 leading-relaxed text-lg">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
