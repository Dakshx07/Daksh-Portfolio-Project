import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/sounds';
import { motion, AnimatePresence } from 'framer-motion';

export const SoundToggle = () => {
    const [isMuted, setIsMuted] = useState(soundManager.isMuted());
    const [showTooltip, setShowTooltip] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    const handleToggle = () => {
        const newMutedState = soundManager.toggleMute();
        setIsMuted(newMutedState);
        if (!newMutedState) {
            soundManager.play('click');
            // Visual feedback
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 300);
        }
    };

    return (
        <div
            className="fixed bottom-6 left-6 z-50"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <button
                onClick={handleToggle}
                className={`w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-ionized-gold/50 backdrop-blur-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group ${isPulsing ? 'animate-pulse' : ''}`}
                data-hover
                aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
                ) : (
                    <Volume2 className="w-5 h-5 text-ionized-gold group-hover:text-yellow-400 transition-colors" />
                )}

                {/* Pulse ring when playing sound */}
                {isPulsing && (
                    <div className="absolute inset-0 rounded-full border-2 border-ionized-gold animate-ping" />
                )}
            </button>

            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-black/90 border border-white/20 rounded-lg backdrop-blur-xl whitespace-nowrap"
                    >
                        <span className="text-xs font-mono text-clean-lumen">
                            {isMuted ? 'Enable UI Sounds' : 'Disable UI Sounds'}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
