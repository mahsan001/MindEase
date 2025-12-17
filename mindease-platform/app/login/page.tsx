'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back!"
            subtitle="Your journey to better mental health continues here."
        >
            <div className="mb-8 flex bg-background rounded-lg p-1">
                <button className="flex-1 py-2 px-4 rounded-md bg-primary text-white font-medium shadow-sm transition-all">
                    Login
                </button>
                <Link href="/register" className="flex-1 py-2 px-4 rounded-md text-gray-600 font-medium text-center hover:bg-white/50 transition-all">
                    Register
                </Link>
            </div>

            <h2 className="font-heading text-2xl font-semibold text-secondary mb-6 text-center">Login to Your Account</h2>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-secondary mb-2">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div className="mt-8 text-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="p-3 bg-background rounded-lg text-sm text-gray-600">
                    <strong>Social Login Options</strong><br />
                    Google / Facebook (Coming Soon)
                </div>
            </div>
        </AuthLayout>
    );
}
