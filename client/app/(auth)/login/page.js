'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Button from '@/components/Button';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.post('/auth/login', { username, password });
            if (data.token) {
                login(data.user, data.token);
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-carbon rounded-lg shadow-2xl border border-gray-800">
                <h2 className="text-3xl font-bold mb-6 text-center text-white italic">PADDOCK <span className="text-f1-red">LOGIN</span></h2>

                {error && <div className="mb-4 p-3 bg-red-900/50 text-red-200 border border-red-500 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-f1-black border border-gray-700 rounded p-2 text-white focus:border-f1-red focus:outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-f1-black border border-gray-700 rounded p-2 text-white focus:border-f1-red focus:outline-none transition-colors"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">Enter Paddock</Button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    New to the grid? <Link href="/register" className="text-f1-red hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}
