import { motion, AnimatePresence } from 'framer-motion';

export default function TicketModal({ meetup, onClose }) {
    if (!meetup) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, y: 50, opacity: 0, rotateX: 10 }}
                    animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ scale: 0.9, y: 50, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.4 }}
                    className="relative w-full max-w-sm cursor-pointer perspective-1000 group"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* The Ticket Itself */}
                    <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_80px_rgba(255,24,1,0.2)] transition-shadow duration-500">

                        {/* Holographic Overlay Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

                        {/* Top: Lanyard Hole */}
                        <div className="flex justify-center pt-6 pb-4 bg-f1-black relative z-10 border-b border-gray-800">
                            <div className="w-16 h-2 bg-gray-800 rounded-full" />
                        </div>

                        {/* Header Section */}
                        <div className="bg-f1-red p-6 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-multiply" />
                            <h2 className="text-3xl font-black italic text-white uppercase font-tech relative z-10 drop-shadow-md">
                                PADDOCK PASS
                            </h2>
                            <p className="text-white/80 text-xs font-bold tracking-[0.3em] uppercase mt-2 relative z-10">
                                VIP ACCESS
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="p-8 space-y-6 bg-carbon relative">
                            {/* Team Stripe */}
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-f1-red via-transparent to-f1-red opacity-50" />

                            <div className="text-center">
                                <h3 className="text-gray-400 text-xs uppercase tracking-widest mb-1">Guest</h3>
                                <div className="text-2xl font-bold text-white font-tech">{meetup.author}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-y border-gray-800 py-6">
                                <div>
                                    <h4 className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Team</h4>
                                    <div className="text-white font-bold leading-tight">{meetup.teamName}</div>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Date</h4>
                                    <div className="text-white font-bold">{meetup.date}</div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h4 className="text-gray-500 text-[10px] uppercase tracking-widest mb-2">Location</h4>
                                <div className="text-f1-red font-bold uppercase tracking-wide text-sm border border-f1-red/30 bg-f1-red/10 rounded-full py-1 px-3 inline-block">
                                    {meetup.location}
                                </div>
                            </div>

                            {/* Simulated QR Code */}
                            <div className="flex justify-center pt-2">
                                <div className="p-2 bg-white rounded-lg">
                                    <div className="w-24 h-24 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GrandPrixVIPAccess')] bg-cover" />
                                </div>
                            </div>

                            <p className="text-center text-[10px] text-gray-600 font-mono pt-2">
                                ID: {meetup.id.toString().padStart(6, '0')} • AUTHORIZED
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 w-full py-3 text-gray-400 hover:text-white uppercase tracking-widest text-xs font-bold transition-colors"
                    >
                        Close Ticket
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
