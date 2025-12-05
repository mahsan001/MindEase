export default function Trust() {
    return (
        <section className="bg-white py-20 px-6" id="about">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="font-heading text-4xl font-semibold text-center mb-16 text-secondary">
                    Why Choose MindEase?
                </h2>

                <div className="flex flex-col md:flex-row justify-around gap-10 mt-10">
                    <div className="flex-1 text-center p-8 bg-background rounded-xl transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="text-5xl mb-5">🔐</div>
                        <h3 className="font-heading font-semibold mb-3 text-xl">100% Private</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Your conversations and journals are encrypted and secure. We never share your data.
                        </p>
                    </div>

                    <div className="flex-1 text-center p-8 bg-background rounded-xl transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="text-5xl mb-5">⚡</div>
                        <h3 className="font-heading font-semibold mb-3 text-xl">Available 24/7</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Get support whenever you need it, day or night. No appointments necessary.
                        </p>
                    </div>

                    <div className="flex-1 text-center p-8 bg-background rounded-xl transition-all hover:-translate-y-1 hover:shadow-md">
                        <div className="text-5xl mb-5">❤️</div>
                        <h3 className="font-heading font-semibold mb-3 text-xl">Judgment-Free</h3>
                        <p className="text-gray-600 leading-relaxed">
                            A safe space to be yourself without fear or stigma. Express freely.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
