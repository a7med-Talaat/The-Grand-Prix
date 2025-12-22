'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function TeamsPage() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/teams').then(data => {
            setTeams(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-center py-20 text-2xl font-tech animate-pulse text-f1-red">INITIALIZING GRID...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-serif italic mb-16 text-center text-white tracking-tighter drop-shadow-2xl"
            >
                CONSTRUCTORS <span className="text-f1-red font-tech not-italic">2025</span>
            </motion.h1>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {teams.map(team => (
                    <motion.div variants={item} key={team.id}>
                        <Link href={`/teams/${team.id}`} className="group block h-full">
                            <div className="bg-carbon rounded-sm overflow-hidden border border-gray-800 hover:border-f1-red transition-colors duration-300 relative h-full flex flex-col shadow-2xl">

                                {/* Real Image Display */}
                                <div className={`h-56 w-full bg-f1-black flex items-center justify-center overflow-hidden relative border-b border-gray-800`}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-f1-black to-transparent z-10 opactiy-50" />
                                    <motion.img
                                        src={team.image}
                                        alt={team.name}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="absolute bottom-2 right-2 z-20">
                                        <span className="text-4xl font-black text-white/10 uppercase tracking-widest font-tech">{team.name.substring(0, 3)}</span>
                                    </div>
                                </div>

                                <div className="p-8 relative flex-grow flex flex-col justify-end">
                                    <div className={`absolute top-0 right-0 w-24 h-1 ${team.color || 'bg-white'} transform origin-right group-hover:scale-x-150 transition-transform duration-300`} />
                                    <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-f1-red transition-colors font-tech italic">{team.name}</h2>
                                    <div className="mt-auto flex items-center justify-between text-gray-400 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                        <span>Team Profile</span>
                                        <span className="group-hover:translate-x-2 transition-transform duration-300 text-f1-red text-lg">&rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
