import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-white px-6 py-5 shadow-sm sticky top-0 z-50">
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                <div className="font-heading text-2xl font-semibold text-primary cursor-pointer">
                    <Link href="/">MindEase</Link>
                </div>
                <div className="flex gap-8 items-center">
                    <Link href="/" className="text-secondary font-medium hover:text-primary transition-colors">
                        Home
                    </Link>
                    <Link href="#features" className="text-secondary font-medium hover:text-primary transition-colors">
                        Features
                    </Link>
                    <Link href="#about" className="text-secondary font-medium hover:text-primary transition-colors">
                        About
                    </Link>
                    <Link
                        href="/login"
                        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
