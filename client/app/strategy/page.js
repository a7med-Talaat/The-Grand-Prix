'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export default function StrategyPage() {
    const [strategies, setStrategies] = useState([]);

    // Mock Tire Degradation Data
    const tireData = [
        { lap: 1, soft: 100, medium: 100, hard: 100 },
        { lap: 10, soft: 60, medium: 85, hard: 95 },
        { lap: 20, soft: 20, medium: 70, hard: 90 },
        { lap: 30, soft: 5, medium: 50, hard: 85 },
        { lap: 40, soft: 0, medium: 30, hard: 80 },
        { lap: 50, soft: 0, medium: 15, hard: 75 },
    ];

    useEffect(() => {
        api.get('/strategies').then(setStrategies);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
            <h1 className="text-5xl font-black italic mb-2 text-center text-white">RACE <span className="text-f1-red">STRATEGY</span></h1>
            <p className="text-center text-gray-400 mb-12">Analysis based on simulation data for upcoming Grand Prix.</p>

            <div className="grid lg:grid-cols-2 gap-12">

                {/* Chart Section */}
                <div className="bg-carbon p-6 rounded-lg border border-gray-800 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Tire Degradation Model</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={tireData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="lap" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#15151E', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="soft" stroke="#EF4444" strokeWidth={3} name="Soft Compound" dot={false} />
                                <Line type="monotone" dataKey="medium" stroke="#EAB308" strokeWidth={3} name="Medium Compound" dot={false} />
                                <Line type="monotone" dataKey="hard" stroke="#F9FAFB" strokeWidth={3} name="Hard Compound" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 text-center">* Vertical Axis: % Performance Remaining | Horizontal Axis: Lap Number</p>
                </div>

                {/* Pit Stop Strategies List */}
                <div className="space-y-6">
                    {strategies.map((strat, idx) => (
                        <div key={idx} className="bg-carbon p-6 rounded-lg border-l-4 border-f1-red hover:bg-gray-800 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-white italic">{strat.track}</h3>
                                <span className="text-xs font-bold bg-gray-700 px-2 py-1 rounded text-gray-300">EST. LOSS: {strat.avgPitLoss}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">Recommended</p>
                                    <p className="text-f1-red font-bold text-lg">{strat.recommended}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">Pit Window</p>
                                    <p className="text-white font-bold">{strat.pitWindow}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">Undercut Power</p>
                                    <p className="text-white font-bold">{strat.undercutPotential}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-f1-black p-6 rounded-lg border border-gray-800">
                        <h4 className="text-white font-bold mb-2 uppercase">Strategy Glossary</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li><strong className="text-white">Undercut:</strong> Pitting earlier to use fresh tires for a faster out-lap.</li>
                            <li><strong className="text-white">Overcut:</strong> Staying out longer to gain time while opponent warms up tires.</li>
                            <li><strong className="text-white">Blistering:</strong> Overheating causing chunks of rubber to break off.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
}
