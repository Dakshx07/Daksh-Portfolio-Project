import { useEffect, useState } from 'react';
import { Grid3x3, Network, Fingerprint, Atom, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
    { id: 'home', icon: Grid3x3, label: 'Home' },
    { id: 'viewfinder', icon: Network, label: 'Projects' },
    { id: 'identity', icon: Fingerprint, label: 'About' },
    { id: 'specs', icon: Atom, label: 'Skills' },
    { id: 'book', icon: Book, label: 'Contact' },
];

export const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 500);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        NAV_ITEMS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-4xl"
        >
            <div className="flex items-center justify-between px-8 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">

                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="hidden sm:inline">ONLINE</span>
                </div>

                <div className="flex items-center gap-8">
                    {NAV_ITEMS.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className="relative group"
                            data-hover
                        >
                            <Icon
                                className={`w-6 h-6 transition-all duration-300 ${activeSection === id
                                        ? 'text-ionized-gold scale-110'
                                        : 'text-gray-500 group-hover:text-white group-hover:scale-110'
                                    }`}
                            />

                            {activeSection === id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-ionized-gold"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}

                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-ionized-gold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="text-xs font-mono text-gray-400 tracking-wider hidden md:block">
                    DAKSH HIRAN
                </div>
            </div>
        </motion.nav>
    );
};
