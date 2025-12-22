'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
    const variants = {
        primary: "text-white border border-f1-red hover:shadow-[0_0_30px_rgba(255,24,1,0.6)]",
        secondary: "text-f1-black bg-white hover:bg-gray-200 border border-white",
        outline: "text-f1-red border border-f1-red hover:text-white"
    };

    return (
        <motion.button
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            type={type}
            onClick={onClick}
            className={cn(
                "relative px-8 py-3 font-black uppercase tracking-widest skew-x-[-15deg] transition-all duration-300 overflow-hidden group",
                variants[variant],
                className
            )}
        >
            {/* Sliding Background Fill */}
            <motion.div
                className={cn(
                    "absolute inset-0 w-full h-full -z-10 bg-f1-red transform origin-left",
                    variant === 'primary' ? 'scale-x-100' : 'scale-x-0'
                )}
                variants={{
                    hover: { scaleX: variant === 'outline' ? 1 : 1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />

            {/* Animated 'Glitch' Border overlay */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-0 group-hover:opacity-100 group-hover:animate-ping" />

            <div className="skew-x-[15deg] relative z-10 flex items-center justify-center gap-2">
                {children}
            </div>
        </motion.button>
    );
};

export default Button;
