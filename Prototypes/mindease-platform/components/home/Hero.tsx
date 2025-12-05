import Link from 'next/link';

export default function Hero() {
    return (
        <section className="max-w-[1400px] mx-auto px-6 py-24 text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-semibold text-secondary mb-6 leading-tight">
                Your Mental Wellness Journey Starts Here
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                Accessible AI-assisted mental health support through therapy chatbot, journaling, and daily personalized tips. A safe, private space for your well-being.
            </p>
            <Link
                href="/register"
                className="inline-block bg-primary text-white px-12 py-4 rounded-xl text-lg font-semibold hover:bg-primary-hover transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
                Start Your Free Journey →
            </Link>
        </section>
    );
}
