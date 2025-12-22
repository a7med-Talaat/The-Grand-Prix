'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const RADIOS = [
    {
        id: 1,
        driver: 'Kimi Räikkönen',
        team: 'Lotus',
        year: 2012,
        gp: 'Abu Dhabi GP',
        quote: "Just leave me alone, I know what to do.",
        context: "Kimi responding to his engineer's updates while leading the race."
    },
    {
        id: 2,
        driver: 'Toto Wolff',
        team: 'Mercedes',
        year: 2021,
        gp: 'Abu Dhabi GP',
        quote: "No, Mikey, no, no, Mikey, that was so not right!",
        context: "Toto Wolff pleading with Race Director Michael Masi during the final lap controversy."
    },
    {
        id: 3,
        driver: 'Carlos Sainz',
        team: 'Ferrari',
        year: 2023,
        gp: 'Singapore GP',
        quote: "Smooth Operator...",
        context: "Carlos singing his trademark song after a masterclass victory."
    },
    {
        id: 4,
        driver: 'Sebastian Vettel',
        team: 'Ferrari',
        year: 2017,
        gp: 'Azerbaijan GP',
        quote: "When did I do dangerous driving?",
        context: "Vettel reacting to a penalty for hitting Hamilton under the safety car."
    },
    {
        id: 5,
        driver: 'Lando Norris',
        team: 'McLaren',
        year: 2021,
        gp: 'Russian GP',
        quote: "NO!",
        context: "Lando refusing to pit for inters just before the heavens opened, costing him the win."
    },
    {
        id: 6,
        driver: 'Charles Leclerc',
        team: 'Ferrari',
        year: 2022,
        gp: 'French GP',
        quote: "NOOOOOOOOO!",
        context: "Heartbreaking scream after crashing out from the lead."
    }
];

export default function RadioPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-f1-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
                    <div>
                        <Button onClick={() => router.push('/')} variant="outline" className="mb-4 text-xs">Home</Button>
                        <h1 className="text-4xl md:text-6xl font-black italic uppercase font-serif">Team Radio Archives</h1>
                        <p className="text-gray-400 mt-2 max-w-xl">
                            Relive the emotion, anger, and comedy of the most iconic messages broadcast to the world.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RADIOS.map((clip) => (
                        <motion.div
                            key={clip.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-carbon border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition-all group relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{clip.driver}</h3>
                                    <p className="text-gray-500 text-xs uppercase tracking-widest">{clip.team} • {clip.year}</p>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="font-serif text-2xl mb-4 italic leading-tight text-white">
                                    "{clip.quote}"
                                </div>
                                <div className="text-xs text-gray-600 border-t border-gray-800 pt-3">
                                    <strong className="text-gray-500 uppercase tracking-wider block mb-1">{clip.gp}</strong>
                                    {clip.context}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
