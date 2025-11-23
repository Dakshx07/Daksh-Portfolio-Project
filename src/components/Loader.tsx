import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
    onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
    const [progress, setProgress] = useState(0);
    const [stage, setStage] = useState(0);

    const stages = [
        'INITIALIZING SYSTEM',
        'LOADING ASSETS',
        'ESTABLISHING CONNECTION',
        'RENDERING INTERFACE',
        'READY'
    ];

    useEffect(() => {
        // Progress simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        // Update stage based on progress
        if (progress < 20) setStage(0);
        else if (progress < 40) setStage(1);
        else if (progress < 60) setStage(2);
        else if (progress < 90) setStage(3);
        else setStage(4);
    }, [progress]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(106,13,173,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(106,13,173,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

            {/* Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.2)_0%,transparent_70%)]" />

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center gap-12">

                {/* Animated Logo/Icon */}
                <div className="relative">
                    {/* Outer Rotating Ring */}
                    <motion.div
                        className="w-40 h-40 rounded-full border-2 border-electric-indigo/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                        {/* Glowing Dot */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-ionized-gold rounded-full shadow-[0_0_20px_rgba(255,200,0,0.8)]" />
                    </motion.div>

                    {/* Middle Ring */}
                    <motion.div
                        className="absolute inset-4 rounded-full border-2 border-electric-indigo/50"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-electric-indigo rounded-full shadow-[0_0_15px_rgba(106,13,173,0.8)]" />
                    </motion.div>

                    {/* Inner Core */}
                    <motion.div
                        className="absolute inset-8 rounded-full bg-gradient-to-br from-electric-indigo/20 to-ionized-gold/20 backdrop-blur-xl flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <span className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-ionized-gold">
                            DH
                        </span>
                    </motion.div>

                    {/* Scanning Line Effect */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                        <div className="w-full h-1 bg-gradient-to-r from-transparent via-ionized-gold to-transparent absolute top-1/2 -translate-y-1/2 transform rotate-45" />
                    </motion.div>
                </div>

                {/* Status Text with Glitch Effect */}
                <div className="text-center">
                    <motion.div
                        className="text-xl md:text-2xl font-mono font-bold text-white mb-2 tracking-wider"
                        key={stage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {stages[stage]}
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-ionized-gold"
                        >
                            _
                        </motion.span>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="w-80 max-w-[90vw] h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                            className="h-full bg-gradient-to-r from-electric-indigo via-purple-500 to-ionized-gold relative"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3, ease: 'linear' }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                    </div>

                    {/* Percentage */}
                    <div className="mt-3 text-sm font-mono text-gray-400 tabular-nums">
                        {progress}%
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-electric-indigo/50 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                {/* Bottom Text */}
                <motion.div
                    className="absolute bottom-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-xs font-mono text-gray-600 tracking-widest">
                        CRAFTING YOUR EXPERIENCE
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
