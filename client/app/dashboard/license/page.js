'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/Button';

export default function LicensePage() {
    const { user, token } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ attended: 0, pending: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchStats();
    }, [user]);

    const fetchStats = async () => {
        try {
            const meetups = await api.get('/meetups', token);
            // Count approved meetups
            const attended = meetups.filter(m => m.status === 'Approved').length;
            const pending = meetups.filter(m => m.status === 'Pending').length;
            setStats({ attended, pending });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-white animate-pulse">Verifying Credentials...</div>;

    const licenseNumber = `FIA-${user.id.toString().padStart(4, '0')}-${user.country.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}`;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen flex flex-col items-center">
            <div className="w-full mb-8 flex justify-between items-center">
                <Button onClick={() => router.push('/dashboard')} variant="outline" className="text-xs">
                    ← Dashboard
                </Button>
                <h1 className="text-2xl font-black italic text-white uppercase font-tech hidden md:block">
                    Official Driver Credential
                </h1>
            </div>

            <motion.div
                initial={{ scale: 0.9, rotateY: 90, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-full max-w-2xl bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
            >
                {/* Header Band */}
                <div className="bg-f1-black text-white p-6 flex justify-between items-center border-b-4 border-f1-red">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                            <span className="text-black font-black text-xs">FIA</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black italic uppercase leading-none">Super License</h2>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Internationally Recognized</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-f1-red font-bold text-xs uppercase">Season</div>
                        <div className="text-3xl font-black italic leading-none">2026</div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 grid md:grid-cols-3 gap-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                    {/* User Image Area */}
                    <div className="md:col-span-1 flex flex-col items-center">
                        <div className="w-40 h-40 bg-gray-300 rounded mb-4 overflow-hidden border-2 border-gray-400 shadow-inner relative">
                            {/* Placeholder generic profile */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500 font-bold text-4xl">
                                {user.username[0].toUpperCase()}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">Holder Signature</div>
                            <div className="font-serif italic text-2xl text-blue-900 opacity-80" style={{ transform: 'rotate(-5deg)' }}>
                                {user.username}
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-600 mb-1">License No.</label>
                                <div className="text-xl font-mono font-bold text-black border-b border-gray-400 pb-1">{licenseNumber}</div>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest text-gray-600 mb-1">Nationality</label>
                                <div className="text-xl font-bold text-black border-b border-gray-400 pb-1 uppercase">{user.country}</div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest text-gray-600 mb-1">Driver Name</label>
                            <div className="text-3xl font-black italic text-black uppercase">{user.username}</div>
                        </div>

                        <div className="bg-gray-100 p-4 rounded border border-gray-300 grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs uppercase text-gray-500 font-bold">Role</div>
                                <div className="font-bold text-f1-red uppercase">{user.role}</div>
                            </div>
                            <div>
                                <div className="text-xs uppercase text-gray-500 font-bold">Valid Until</div>
                                <div className="font-bold text-black">31 DEC 2026</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-f1-black p-3 rounded text-center text-white">
                                <div className="text-2xl font-bold font-tech text-f1-red">{stats.attended}</div>
                                <div className="text-[10px] uppercase tracking-widest opacity-70">Races Attended</div>
                            </div>
                            <div className="bg-gray-800 p-3 rounded text-center text-white">
                                <div className="text-2xl font-bold font-tech text-yellow-400">{stats.pending}</div>
                                <div className="text-[10px] uppercase tracking-widest opacity-70">Pending Requests</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Holographic Strip */}
                <div className="h-4 bg-gradient-to-r from-transparent via-white/40 to-transparent absolute bottom-12 w-full animate-pulse opacity-50 pointer-events-none" />

                {/* Footer */}
                <div className="bg-f1-black p-2 text-center">
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest">
                        This license is the property of the Fédération Internationale de l&apos;Automobile.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
