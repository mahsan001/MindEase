'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
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
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Automatically login or redirect to login
            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join thousands who have found support, peace, and growth with MindEase."
        >
            <div className="mb-8 flex bg-background rounded-lg p-1">
                <Link href="/login" className="flex-1 py-2 px-4 rounded-md text-gray-600 font-medium text-center hover:bg-white/50 transition-all">
                    Login
                </Link>
                <button className="flex-1 py-2 px-4 rounded-md bg-primary text-white font-medium shadow-sm transition-all">
                    Register
                </button>
            </div>

            <h2 className="font-heading text-2xl font-semibold text-secondary mb-6 text-center">Start Your Journey</h2>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-secondary mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

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
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <div className="mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" required className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm text-gray-600">I agree to Terms & Privacy Policy</span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </AuthLayout>
    );
}
