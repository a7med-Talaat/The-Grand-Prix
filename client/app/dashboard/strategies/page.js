'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function StrategiesPage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [strategies, setStrategies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        track: '',
        recommended: '',
        pitWindow: '',
        undercutPotential: 'Medium',
        avgPitLoss: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            router.push('/dashboard');
            return;
        }
        fetchStrategies();
    }, [user]);

    const fetchStrategies = async () => {
        try {
            const data = await api.get('/strategies', token);
            setStrategies(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this strategy?')) return;
        try {
            await api.delete(`/strategies/${id}`, token);
            fetchStrategies();
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/strategies', formData, token);
            setIsCreating(false);
            setFormData({ track: '', recommended: '', pitWindow: '', undercutPotential: 'Medium', avgPitLoss: '' });
            fetchStrategies();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="text-center py-20 text-white animate-pulse">Loading Strategy Data...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <Button onClick={() => router.push('/dashboard')} variant="outline" className="mb-4 text-xs">
                        ← Back to Dashboard
                    </Button>
                    <h1 className="text-4xl font-black italic text-white uppercase font-tech">Manage Strategies</h1>
                </div>
                <Button onClick={() => setIsCreating(!isCreating)} variant="primary">
                    {isCreating ? 'Cancel' : 'Add New Strategy'}
                </Button>
            </div>

            {isCreating && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 p-8 bg-carbon border border-gray-700 rounded-lg shadow-xl"
                >
                    <h2 className="text-xl font-bold text-white mb-6 uppercase italic">New Race Strategy</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Track Name</label>
                            <input
                                required
                                value={formData.track}
                                onChange={e => setFormData({ ...formData, track: e.target.value })}
                                className="w-full bg-black/50 border border-gray-600 rounded p-3 text-white focus:border-f1-red outline-none"
                                placeholder="e.g. Monaco Grand Prix"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Recommended Strategy</label>
                            <input
                                required
                                value={formData.recommended}
                                onChange={e => setFormData({ ...formData, recommended: e.target.value })}
                                className="w-full bg-black/50 border border-gray-600 rounded p-3 text-white focus:border-f1-red outline-none"
                                placeholder="e.g. Soft -> Hard"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Pit Window</label>
                            <input
                                required
                                value={formData.pitWindow}
                                onChange={e => setFormData({ ...formData, pitWindow: e.target.value })}
                                className="w-full bg-black/50 border border-gray-600 rounded p-3 text-white focus:border-f1-red outline-none"
                                placeholder="e.g. Lap 20-25"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Avg Pit Loss</label>
                            <input
                                required
                                value={formData.avgPitLoss}
                                onChange={e => setFormData({ ...formData, avgPitLoss: e.target.value })}
                                className="w-full bg-black/50 border border-gray-600 rounded p-3 text-white focus:border-f1-red outline-none"
                                placeholder="e.g. 22s"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Undercut Potential</label>
                            <select
                                value={formData.undercutPotential}
                                onChange={e => setFormData({ ...formData, undercutPotential: e.target.value })}
                                className="w-full bg-black/50 border border-gray-600 rounded p-3 text-white focus:border-f1-red outline-none"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 flex justify-end mt-4">
                            <Button type="submit">Save Strategy</Button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="grid gap-6">
                {strategies.map((strategy) => (
                    <div key={strategy.id} className="bg-carbon border border-gray-800 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center hover:border-gray-600 transition-colors">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold text-white font-tech italic mb-2">{strategy.track}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-f1-red"></span>
                                    {strategy.recommended}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    Window: {strategy.pitWindow}
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                    Undercut: {strategy.undercutPotential}
                                </span>
                            </div>
                        </div>
                        <Button onClick={() => handleDelete(strategy.id)} className="bg-red-900/50 text-red-300 border border-red-800 hover:bg-f1-red hover:text-white hover:border-f1-red transition-all">
                            Delete
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
