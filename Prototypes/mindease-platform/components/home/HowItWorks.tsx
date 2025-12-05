export default function HowItWorks() {
    const steps = [
        { number: 1, title: "Create Account", description: "Quick sign up with just your email" },
        { number: 2, title: "Choose Your Tool", description: "Chat, journal, or explore tips" },
        { number: 3, title: "Express Yourself", description: "Share thoughts in a safe space" },
        { number: 4, title: "Track Progress", description: "Monitor your wellness journey" }
    ];

    return (
        <section className="bg-background py-20 px-6">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="font-heading text-4xl font-semibold text-center mb-16 text-secondary">
                    Getting Started is Simple
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white rounded-xl p-8 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                            <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 font-semibold text-2xl font-heading">
                                {step.number}
                            </div>
                            <h3 className="font-heading font-semibold mb-3 text-lg">{step.title}</h3>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
