import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / scrollHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initial call

        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
        >
            <div
                className="h-full bg-gradient-to-r from-electric-indigo via-purple-500 to-ionized-gold shadow-[0_0_10px_rgba(106,13,173,0.5)]"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
            />
        </motion.div>
    );
};
