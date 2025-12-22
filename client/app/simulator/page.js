'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SimulatorPage() {
    const router = useRouter();

    // State for inputs
    const [laps, setLaps] = useState(50);
    const [lapTime, setLapTime] = useState(90); // Seconds
    const [pitLoss, setPitLoss] = useState(24); // Seconds
    const [stops, setStops] = useState(1);

    // Calculated results
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        calculateStrategy();
    }, [laps, lapTime, pitLoss, stops]);

    const calculateStrategy = () => {
        // Simple Logic: Base Race Time + Pit Loss
        // (Laps * AvgLap) + (Stops * PitLoss)
        const baseTime = laps * lapTime;
        const totalPitLoss = stops * pitLoss;
        setTotalTime(baseTime + totalPitLoss);
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <div className="min-h-screen bg-f1-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
                    <div>
                        <Button onClick={() => router.push('/')} variant="outline" className="mb-4 text-xs">Home</Button>
                        <h1 className="text-4xl md:text-6xl font-black italic uppercase font-serif">Pit Wall Simulator</h1>
                        <p className="text-gray-400 mt-2 max-w-xl">
                            Calculate race durations and strategic deltas using live variables.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Controls */}
                    <div className="space-y-8 bg-carbon p-8 rounded-xl border border-gray-800">
                        <div>
                            <label className="flex justify-between text-sm uppercase tracking-widest font-bold mb-2">Race Distance (Laps)</label>
                            <input
                                type="range" min="10" max="80" value={laps}
                                onChange={(e) => setLaps(Number(e.target.value))}
                                className="w-full accent-f1-red h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-right font-tech text-f1-red text-xl">{laps} Laps</div>
                        </div>

                        <div>
                            <label className="flex justify-between text-sm uppercase tracking-widest font-bold mb-2">Avg. Lap Time (s)</label>
                            <input
                                type="range" min="60" max="150" value={lapTime}
                                onChange={(e) => setLapTime(Number(e.target.value))}
                                className="w-full accent-f1-red h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="text-right font-tech text-f1-red text-xl">{lapTime}s</div>
                        </div>

                        <div>
                            <label className="flex justify-between text-sm uppercase tracking-widest font-bold mb-2">Pit Stop Count</label>
                            <div className="flex gap-2">
                                {[0, 1, 2, 3].map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setStops(n)}
                                        className={`flex-1 py-3 font-bold rounded ${stops === n ? 'bg-f1-red text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                    >
                                        {n} STOP
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results Display */}
                    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-f1-red blur-[150px] opacity-20 pointer-events-none" />

                        <div className="relative z-10 text-center">
                            <h3 className="text-gray-500 uppercase tracking-[0.3em] text-sm mb-4">Estimated Race Duration</h3>
                            <motion.div
                                key={totalTime}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-6xl md:text-8xl font-black italic font-tech text-white mb-8"
                            >
                                {formatTime(totalTime)}
                            </motion.div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-8">
                                <div>
                                    <div className="text-xs uppercase text-gray-500">Pit Loss Delta</div>
                                    <div className="text-2xl font-bold font-mono text-f1-red">+{stops * pitLoss}s</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-gray-500">Avg Speed (Est)</div>
                                    <div className="text-2xl font-bold font-mono text-white">{(5.3 * (3600 / lapTime)).toFixed(1)} km/h</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
