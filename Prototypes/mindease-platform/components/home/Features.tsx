export default function Features() {
    const features = [
        {
            icon: "💬",
            title: "AI Therapy Chatbot",
            description: "Chat with our supportive AI therapist anytime. Get immediate, empathetic responses to your thoughts and feelings."
        },
        {
            icon: "📔",
            title: "Private Journaling",
            description: "Write and store your thoughts securely. Express yourself freely in a safe, private space with AI insights."
        },
        {
            icon: "💡",
            title: "Daily Wellness Tips",
            description: "Receive personalized tips, reminders, and exercises to improve your mental health every day."
        },
        {
            icon: "🔒",
            title: "Complete Privacy",
            description: "Your data is yours. We prioritize your privacy with secure storage and no unauthorized access."
        },
        {
            icon: "📊",
            title: "Mood Tracking",
            description: "Monitor your emotional patterns over time with visual insights and progress tracking."
        },
        {
            icon: "🌟",
            title: "Free Access",
            description: "No subscriptions, no hidden fees. Mental health support should be accessible to everyone."
        }
    ];

    return (
        <section className="bg-white py-20 px-6" id="features">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="font-heading text-4xl font-semibold text-center mb-16 text-secondary">
                    How MindEase Helps You
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-background rounded-xl p-10 text-center transition-all hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                        >
                            <div className="text-6xl mb-5">{feature.icon}</div>
                            <h3 className="font-heading text-2xl font-semibold mb-4 text-secondary">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
