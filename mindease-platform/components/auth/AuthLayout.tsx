import Link from 'next/link';
import Navbar from '../Navbar';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col md:flex-row max-w-[1400px] mx-auto w-full">
                {/* Left Side - Welcome Info */}
                <div className="flex-1 p-10 md:p-20 flex flex-col justify-center bg-white md:bg-transparent">
                    <h1 className="font-heading text-4xl md:text-5xl font-semibold text-secondary mb-6">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-12 leading-relaxed">
                        {subtitle}
                    </p>

                    <ul className="space-y-8">
                        <li className="flex items-start gap-5 p-5 bg-white/50 rounded-xl transition-transform hover:translate-x-2">
                            <div className="text-3xl">💬</div>
                            <div>
                                <strong className="block text-lg text-secondary mb-1">24/7 AI Support</strong>
                                <p className="text-gray-600">Talk anytime you need with our empathetic AI therapist</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-5 p-5 bg-white/50 rounded-xl transition-transform hover:translate-x-2">
                            <div className="text-3xl">🔒</div>
                            <div>
                                <strong className="block text-lg text-secondary mb-1">Completely Private</strong>
                                <p className="text-gray-600">Your data stays secure with end-to-end encryption</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-5 p-5 bg-white/50 rounded-xl transition-transform hover:translate-x-2">
                            <div className="text-3xl">📔</div>
                            <div>
                                <strong className="block text-lg text-secondary mb-1">Personal Journaling</strong>
                                <p className="text-gray-600">Express yourself freely in your private space</p>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Right Side - Auth Forms */}
                <div className="flex-1 p-6 md:p-20 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
