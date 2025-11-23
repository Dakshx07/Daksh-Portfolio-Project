import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Layers, Shield, Globe, CheckCircle } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

gsap.registerPlugin(ScrollTrigger);

export const Identity = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { getTransform } = useParallax();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(
            container.querySelectorAll('.fade-in-item'),
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section
            id="identity"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-galactic-grey py-20 overflow-hidden"
        >
            {/* Background Grid with Parallax */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(106,13,173,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(106,13,173,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
                style={{ transform: getTransform(-0.3) }}
            />

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex items-center justify-between mb-16 fade-in-item">
                    <div className="text-xs font-mono text-ionized-gold tracking-widest">
                        ● ABOUT ME // WHO I AM
                    </div>
                    <div className="text-xs font-mono text-gray-500">
                        DAKSH HIRAN // JAIPUR, INDIA
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* Left: Profile Card with Parallax */}
                    <div
                        className="w-full lg:w-[400px] fade-in-item"
                        style={{ transform: getTransform(0.5) }}
                    >
                        <div className="relative bg-black/60 border border-electric-indigo/30 rounded-2xl p-8 backdrop-blur-xl group hover:border-electric-indigo/50 transition-all duration-500">
                            {/* Holographic shimmer overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                            <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono text-ionized-gold">
                                <CheckCircle className="w-4 h-4" />
                                VERIFIED
                            </div>

                            <div className="absolute top-6 right-6 text-right text-xs font-mono text-gray-400">
                                <div>DEVELOPER</div>
                                <div className="text-ionized-gold">& DESIGNER</div>
                            </div>

                            <div className="mt-12 mb-8">
                                <div className="w-full h-64 rounded-xl overflow-hidden border border-white/10 relative bg-black group/img">
                                    <img
                                        src="/assets/daksh_new.png"
                                        alt="Daksh Hiran"
                                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700"
                                    />
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.3)_2px)] bg-[size:100%_4px] pointer-events-none opacity-50" />
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono text-green-500">AVAILABLE FOR WORK</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Main Content */}
                    <div className="flex-1 fade-in-item">

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                            <span className="block text-white">CRAFTING</span>
                            <span className="block text-electric-indigo">DIGITAL MAGIC</span>
                        </h1>

                        <div className="border-l-4 border-electric-indigo pl-6 mb-12">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                "I'm a <span className="text-white font-semibold">creative developer</span> with a passion for building beautiful, functional web experiences. My background in both design and development allows me to bridge the gap between aesthetics and code—creating interfaces that not only look stunning but feel incredible to use."
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xs font-mono text-gray-500 tracking-widest mb-6">
                                WHAT I BRING
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: Zap,
                                        title: 'RAPID EXECUTION',
                                        desc: 'From concept to deployment—I move fast without sacrificing quality. Clean code, smooth animations, zero compromises.',
                                        index: 0
                                    },
                                    {
                                        icon: Layers,
                                        title: 'DESIGN & CODE',
                                        desc: 'I speak both languages fluently. No handoff friction—I design in Figma and build in React with equal confidence.',
                                        index: 1
                                    },
                                    {
                                        icon: Shield,
                                        title: 'RELIABILITY',
                                        desc: 'Clear communication, on-time delivery, and proactive problem-solving. I take ownership of my work.',
                                        index: 2
                                    },
                                    {
                                        icon: Globe,
                                        title: 'GLOBAL MINDSET',
                                        desc: 'Based in Jaipur (IST), comfortable working with global teams. Used to async collaboration and flexible hours.',
                                        index: 3
                                    }
                                ].map((param) => (
                                    <div
                                        key={param.index}
                                        className="group relative p-6 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(106,13,173,0.2)]"
                                        style={{ transform: getTransform(0.1 * (param.index + 1)) }}
                                    >
                                        <div className={`w-12 h-12 rounded-lg ${param.index < 2 ? 'bg-electric-indigo/10' : 'bg-ionized-gold/10'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <param.icon className={`w-6 h-6 ${param.index < 2 ? 'text-electric-indigo' : 'text-ionized-gold'} group-hover:drop-shadow-[0_0_10px_currentColor]`} />
                                        </div>
                                        <h4 className="text-lg font-display font-bold text-white mb-2">
                                            {param.title}
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {param.desc}
                                        </p>

                                        {/* Corner brackets animation */}
                                        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
