'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function TeamDetailPage() {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [bookingStatus, setBookingStatus] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (id) {
            api.get(`/teams/${id}`).then(data => {
                setTeam(data);
                setLoading(false);
            });
        }
    }, [id]);

    const handleBook = async (e) => {
        e.preventDefault();
        if (!user) {
            router.push('/login');
            return;
        }

        try {
            const res = await api.post('/meetups', { teamId: team.id, date }, user ? localStorage.getItem('token') : null);
            if (res.meetup) {
                setBookingStatus(`Success! Request sent. Location: ${res.meetup.location} (${res.meetup.type})`);
            } else {
                setBookingStatus(`Error: ${res.message}`);
            }
        } catch (err) {
            setBookingStatus('Failed to request meetup.');
        }
    };

    if (loading) return <div className="text-center py-20 font-tech animate-pulse text-f1-red">Loading Telemetry...</div>;
    if (!team) return <div className="text-center py-20">Team not found</div>;

    return (
        <div className="min-h-screen pb-20 overflow-x-hidden">

            {/* Header / Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`h-[50vh] w-full relative flex items-end overflow-hidden`}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-f1-black via-f1-black/50 to-transparent z-10"></div>
                <img src={team.image} alt={team.name} className="absolute inset-0 w-full h-full object-cover" />

                <div className="max-w-7xl mx-auto px-4 w-full pb-12 flex items-end justify-between relative z-20">
                    <div>
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="text-6xl sm:text-8xl font-black italic text-white uppercase tracking-tighter font-tech drop-shadow-2xl"
                        >
                            {team.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/90 text-2xl mt-2 font-medium font-tech tracking-wide"
                        >
                            {team.base}
                        </motion.p>
                    </div>
                    <div className="hidden sm:block text-right text-white/80">
                        <div className="text-sm uppercase tracking-widest font-bold text-f1-red">Base Country</div>
                        <div className="text-4xl font-bold text-white font-tech">{team.boothCountry}</div>
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Info & History */}
                <div className="lg:col-span-2 space-y-12">

                    <motion.section
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-6 italic border-l-8 border-f1-red pl-6 font-tech">TEAM HISTORY</h2>
                        <p className="text-gray-300 text-lg leading-relaxed font-light tracking-wide">{team.history}</p>
                    </motion.section>

                    <section>
                        <h2 className="text-4xl font-bold text-white mb-8 italic border-l-8 border-f1-red pl-6 font-tech">THE DRIVERS</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {team.drivers.map((driver, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2 }}
                                    className="bg-carbon p-8 rounded-sm border border-gray-800 flex items-center gap-6 hover:border-gray-600 transition-colors group"
                                >
                                    <div className="h-20 w-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl font-bold text-white group-hover:bg-f1-red transition-colors flex-shrink-0">
                                        {driver.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white font-tech italic">{driver}</h3>
                                        <p className="text-f1-red text-sm uppercase font-bold tracking-widest">Driver {idx + 1}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Right Column: Stats & Booking */}
                <div className="space-y-8">

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-carbon p-8 rounded-sm border-t-4 border-gray-600 shadow-xl"
                    >
                        <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider font-tech">Tech Specs</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex justify-between border-b border-gray-800 pb-2">
                                <span className="uppercase text-xs tracking-widest">Chassis</span>
                                <span className="text-white font-bold font-tech text-lg">{team.chassis}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-800 pb-2">
                                <span className="uppercase text-xs tracking-widest">Power Unit</span>
                                <span className="text-white font-bold font-tech text-lg">{team.powerUnit}</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-800 pb-2">
                                <span className="uppercase text-xs tracking-widest">Principal</span>
                                <span className="text-white font-bold font-tech text-lg">{team.principal}</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-f1-black/80 backdrop-blur-md p-8 rounded-sm border border-f1-red shadow-[0_0_40px_rgba(255,24,1,0.15)] relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-2 italic font-tech">MEET THE TEAM</h3>
                        <p className="text-gray-400 text-sm mb-8">Request a private session. 2025 Season slots available.</p>

                        {user ? (
                            <form onSubmit={handleBook} className="space-y-6 relative z-10">
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Preferred Date</label>
                                    <input
                                        type="date"
                                        required
                                        min="2025-01-01"
                                        className="w-full bg-black/50 border border-gray-700 rounded-sm p-3 text-white mt-2 focus:border-f1-red outline-none focus:ring-1 focus:ring-f1-red transition-all"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" variant="primary" className="w-full shadow-lg">Request Meetup</Button>
                                {bookingStatus && (
                                    <div className={`p-4 rounded border ${bookingStatus.includes('Error') ? 'bg-red-950/50 border-red-500 text-red-200' : 'bg-green-950/50 border-green-500 text-green-200'}`}>
                                        {bookingStatus}
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="text-center relative z-10">
                                <p className="text-gray-400 mb-6">Login to access the booking system.</p>
                                <Button onClick={() => router.push('/login')} variant="outline" className="w-full">Login Now</Button>
                            </div>
                        )}

                        {user && (
                            <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-gray-500 italic">
                                {team.boothCountry === user.country ? (
                                    <span className="flex items-center gap-2 text-green-400 font-bold">
                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                        Offline Meetup Available in {team.boothCountry}
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 text-blue-400 font-bold">
                                        <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                        Online Meeting (Zoom/Meet)
                                    </span>
                                )}
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
