import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Zap, Monitor } from 'lucide-react';

export const PerformanceDashboard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [fps, setFps] = useState(60);
    const [memoryUsage, setMemoryUsage] = useState(0);
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());
    const fpsArray = useRef<number[]>([]);

    useEffect(() => {
        // Listen for secret command to toggle dashboard
        const handleKeyPress = (e: KeyboardEvent) => {
            // Ctrl + Shift + D to toggle
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                setIsVisible(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let animationFrameId: number;

        const measureFPS = () => {
            const now = performance.now();
            const delta = now - lastTime.current;

            if (delta >= 1000) {
                const currentFps = Math.round((frameCount.current * 1000) / delta);
                fpsArray.current.push(currentFps);
                if (fpsArray.current.length > 10) fpsArray.current.shift();

                const avgFps = Math.round(
                    fpsArray.current.reduce((a, b) => a + b, 0) / fpsArray.current.length
                );

                setFps(avgFps);
                frameCount.current = 0;
                lastTime.current = now;
            }

            frameCount.current++;

            // Get memory usage if available
            if ('memory' in performance) {
                const memory = (performance as any).memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
                setMemoryUsage(usedMB);
            }

            animationFrameId = requestAnimationFrame(measureFPS);
        };

        animationFrameId = requestAnimationFrame(measureFPS);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isVisible]);

    if (!isVisible) return null;

    const getFPSColor = () => {
        if (fps >= 55) return 'text-green-500';
        if (fps >= 30) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="fixed top-24 right-6 w-80 bg-black/90 border border-ionized-gold/50 rounded-xl backdrop-blur-xl z-50 overflow-hidden shadow-[0_0_30px_rgba(255,200,0,0.3)]"
            >
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-ionized-gold animate-pulse" />
                        <h3 className="font-display font-bold text-white">PERFORMANCE</h3>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                        data-hover
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                </div>

                {/* Metrics */}
                <div className="p-4 space-y-4">
                    {/* FPS */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Zap className={`w-4 h-4 ${getFPSColor()}`} />
                            <span className="text-sm font-mono text-gray-400">FPS</span>
                        </div>
                        <span className={`text-2xl font-display font-bold tabular-nums ${getFPSColor()}`}>
                            {fps}
                        </span>
                    </div>

                    {/* FPS Bar */}
                    <div className="relative h-2 bg-white/10  rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 ${fps >= 55 ? 'bg-green-500' : fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                        />
                    </div>

                    {/* Memory */}
                    {memoryUsage > 0 && (
                        <>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <Monitor className="w-4 h-4 text-electric-indigo" />
                                    <span className="text-sm font-mono text-gray-400">Memory</span>
                                </div>
                                <span className="text-lg font-mono text-electric-indigo tabular-nums">
                                    {memoryUsage} MB
                                </span>
                            </div>
                        </>
                    )}

                    {/* Browser Info */}
                    <div className="pt-2 border-t border-white/10 space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-gray-500">Browser</span>
                            <span className="text-gray-300">{navigator.userAgent.match(/Chrome|Firefox|Safari|Edge/)?.[0] || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-gray-500">Resolution</span>
                            <span className="text-gray-300">{window.innerWidth}x{window.innerHeight}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-3 bg-white/5 border-t border-white/10">
                    <p className="text-[10px] font-mono text-gray-500 text-center">
                        Press <span className="text-ionized-gold">Ctrl+Shift+D</span> to toggle
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
