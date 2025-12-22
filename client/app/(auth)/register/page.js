'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const COUNTRIES = [
    "Austria", "Germany", "Italy", "United Kingdom", "France",
    "Netherlands", "Spain", "USA", "Mexico", "Australia",
    "Japan", "China", "Brazil", "Canada", "Bahrain"
];

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        country: COUNTRIES[0]
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await api.post('/auth/register', formData);
            if (data.token) {
                login(data.user, data.token);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-carbon rounded-lg shadow-2xl border border-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-white italic">JOIN THE <span className="text-f1-red">GRID</span></h2>

                {error && <div className="mb-4 p-3 bg-red-900/50 text-red-200 border border-red-500 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full bg-f1-black border border-gray-700 rounded p-2 text-white focus:border-f1-red focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-f1-black border border-gray-700 rounded p-2 text-white focus:border-f1-red focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Country</label>
                        <select
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full bg-f1-black border border-gray-700 rounded p-2 text-white focus:border-f1-red focus:outline-none transition-colors"
                        >
                            {COUNTRIES.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500 mt-1">* Affects offline meetup availability</p>
                    </div>

                    <Button type="submit" className="w-full">Register</Button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already have a superlicense? <Link href="/login" className="text-f1-red hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}
