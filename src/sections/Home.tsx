import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, User } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';
import { useTextScramble } from '../hooks/useTextScramble';

export const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isHoveringTitle, setIsHoveringTitle] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { getTransform } = useParallax();

    const { displayText: line1 } = useTextScramble('DAKSH', hasLoaded);
    const { displayText: line2 } = useTextScramble('HIRAN', hasLoaded);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setHasLoaded(true)
        });

        tl.fromTo(textRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        );
    }, []);

    const handleInitialize = () => {
        const nextSection = document.getElementById('identity');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Elements with Parallax */}
            <div className="absolute inset-0 bg-galactic-grey">
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.15)_0%,transparent_70%)]"
                    style={{ transform: getTransform(-0.5) }}
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* HUD Corners with Parallax */}
            <div style={{ transform: getTransform(2) }}>
                <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-electric-indigo/30" />
                <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 border-electric-indigo/30" />
                <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 border-electric-indigo/30" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-electric-indigo/30" />
            </div>

            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-ionized-gold rotate-45" />
                    <span className="text-xs font-mono tracking-widest text-gray-400">PORTFOLIO</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                    <span>CREATIVE DEVELOPER</span>
                    <User className="w-4 h-4" />
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center h-full">

                <div
                    ref={textRef}
                    className="text-center relative z-20 mb-10"
                    onMouseEnter={() => setIsHoveringTitle(true)}
                    onMouseLeave={() => setIsHoveringTitle(false)}
                    style={{ transform: getTransform(0.2) }}
                >
                    <div className="inline-block border border-electric-indigo/30 rounded-full px-4 py-1 mb-6 bg-electric-indigo/5 backdrop-blur-sm">
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-electric-indigo uppercase">
                            Full-Stack Developer & Designer
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-2 relative cursor-default transition-all duration-500">
                        <span className={`block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 transition-opacity duration-500 ${isHoveringTitle ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                            {line1}
                        </span>
                        <span className={`block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 transition-opacity duration-500 ${isHoveringTitle ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                            {line2}
                        </span>

                        <span className="absolute inset-0 text-electric-indigo opacity-30 blur-sm animate-pulse pointer-events-none" aria-hidden="true">
                            {line1}<br />{line2}
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-electric-indigo font-light tracking-[0.5em] uppercase mb-12">
                        Creative Developer
                    </p>

                    <p className="text-gray-400 max-w-lg mx-auto mb-12 text-sm md:text-base leading-relaxed font-light">
                        I craft <span className="text-white font-medium">interactive experiences</span> where design meets code, turning ideas into polished digital products.
                    </p>

                    <button
                        onClick={handleInitialize}
                        className="group relative px-10 py-4 bg-transparent border border-ionized-gold/30 hover:border-ionized-gold text-clean-lumen font-display tracking-wider uppercase transition-all duration-300 overflow-hidden animate-pulse-ring"
                        data-hover
                    >
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
                            Explore My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-ionized-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />

                        {/* Pulsing ring effect */}
                        <div className="absolute inset-0 border border-ionized-gold rounded opacity-75 animate-ping pointer-events-none" />
                    </button>
                </div>

                {/* Holographic Image with Parallax */}
                <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] md:w-[40vw] h-[60vh] pointer-events-none transition-all duration-700 ease-out ${isHoveringTitle ? 'z-30 scale-110 opacity-100' : 'z-10 scale-100 opacity-80'}`}
                    style={{ transform: `translate(-50%, 0) ${getTransform(0.8)}`.replace('translate(', 'translate(calc(-50% + ') }}
                >
                    <div className="relative w-full h-full">
                        <img
                            src="/assets/daksh_new.png"
                            alt="Daksh Hiran"
                            className="w-full h-full object-contain object-bottom mix-blend-lighten drop-shadow-[0_0_30px_rgba(106,13,173,0.3)]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.5)_2px)] bg-[size:100%_4px] opacity-20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-galactic-grey via-transparent to-transparent" />
                    </div>
                </div>

            </div>
        </section>
    );
};
