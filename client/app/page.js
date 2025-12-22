'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-f1-black text-white selection:bg-f1-red selection:text-white overflow-x-hidden">

      {/* Cinematic Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Animated Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 z-20" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541845157-a6d2d100d931?auto=format&fit=crop&q=80')] bg-cover bg-center animate-[scale_40s_ease-out_infinite] scale-110 z-10" />
          {/* Grain Overlay for film look */}
          <div className="absolute inset-0 bg-grain opacity-20 z-30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-40 text-center px-4 max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mb-8"
          >
            <h2 className="text-gray-300 tracking-[0.6em] uppercase text-xs md:text-sm mb-8 font-light flex items-center gap-4 justify-center opacity-80">
              <span className="w-12 h-[1px] bg-white/50" /> EST. 2025 <span className="w-12 h-[1px] bg-white/50" />
            </h2>
            <h1 className="text-6xl md:text-[9rem] font-serif italic text-white leading-[0.85] tracking-tighter drop-shadow-2xl mix-blend-overlay opacity-90">
              THE ART OF <br />
              <span className="font-tech not-italic text-f1-red opacity-100 mix-blend-normal">RACING</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-300 font-light max-w-xl mx-auto leading-relaxed mb-12 tracking-wide"
          >
            Experience the heritage, strategy, and pure speed of the world's most prestigious motorsport category.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <Link href="/teams" className="group relative px-10 py-4 bg-transparent border border-white/20 overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-white group-hover:text-black uppercase tracking-[0.2em] text-xs font-bold transition-colors duration-300">
                Explore Teams
              </span>
            </Link>



            <Link href="/login" className="group relative px-10 py-4 bg-f1-red border border-f1-red overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-red-800 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-white uppercase tracking-[0.2em] text-xs font-bold flex items-center gap-2">
                Paddock Access <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Elegant Abstract Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40 opacity-50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Curated Collection Section */}
      <section className="py-32 px-6 md:px-20 bg-black relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
            <div>
              <h3 className="text-f1-red font-mono text-xs uppercase tracking-widest mb-2">The Collection</h3>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Curated Engineering</h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed mt-6 md:mt-0">
              From the aerodynamics of the chassis to the strategy on the pit wall, every detail matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Team Radio", subtitle: "Iconic Audio Archives", link: "/radio" },
              { title: "Pit Wall", subtitle: "Strategy Simulator", link: "/simulator" },
              { title: "Membership", subtitle: "Exclusive Access", link: "/register" }
            ].map((item, i) => (
              <Link href={item.link} key={i} className="group relative bg-black p-12 hover:bg-zinc-900 transition-colors duration-500 ease-out h-full border border-black">
                <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-6 group-hover:text-f1-red transition-colors">0{i + 1} ///</h4>
                <h3 className="text-3xl text-white font-serif italic mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm font-light mb-8">{item.subtitle}</p>

                <div className="absolute bottom-12 right-12 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-f1-red text-xl">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
