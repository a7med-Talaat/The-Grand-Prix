'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
            <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <span className="text-3xl font-serif text-white italic tracking-tighter group-hover:text-f1-red transition-colors duration-500">
                        The Grand Prix
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-f1-red mt-1 font-bold opacity-80">Collection</span>
                </Link>

                {/* Minimalist Desktop Links */}
                <div className="hidden md:flex items-center space-x-12">
                    <Link href="/teams" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all hover:tracking-[0.3em] duration-300">Teams</Link>
                    <Link href="/strategy" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-white transition-all hover:tracking-[0.3em] duration-300">Strategy</Link>

                    {user ? (
                        <div className="flex items-center gap-6 border-l border-white/20 pl-6 h-8">
                            <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-f1-red hover:text-white transition-colors">
                                Paddock
                            </Link>
                            <button onClick={logout} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6 border-l border-white/20 pl-6 h-8">
                            <Link href="/login" className="text-xs font-bold uppercase tracking-widest text-white hover:text-f1-red transition-colors">Access</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
