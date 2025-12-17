export default function HowItWorks() {
    const steps = [
        { number: "01", title: "Create Account", description: "Quick sign up with just your email to get started instantly." },
        { number: "02", title: "Choose Your Tool", description: "Chat with AI, write in your journal, or explore daily tips." },
        { number: "03", title: "Express Yourself", description: "Share your thoughts freely in a safe, judgment-free space." },
        { number: "04", title: "Track Progress", description: "Monitor your mood and wellness journey over time." }
    ];

    return (
        <section className="py-32 px-6 bg-surface-alt/50 relative">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
                        Getting Started is Simple
                    </h2>
                    <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
                        Your journey to better mental health begins with four easy steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            <div className="bg-white p-8 rounded-[2rem] border border-white/50 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full relative z-10">
                                <div className="w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center mb-6 font-heading font-bold text-2xl shadow-lg shadow-secondary/20 group-hover:bg-primary group-hover:shadow-primary/20 transition-all duration-500">
                                    {step.number}
                                </div>
                                <h3 className="font-heading font-bold mb-3 text-xl text-secondary">{step.title}</h3>
                                <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
