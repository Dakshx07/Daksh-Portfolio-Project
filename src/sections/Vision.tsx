import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Target, Rocket, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Vision = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(
            container.querySelectorAll('.vision-card'),
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
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
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-galactic-grey to-black py-20 overflow-hidden"
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(106,13,173,0.1)_0%,transparent_50%)] animate-pulse" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="text-center mb-20">
                    <div className="inline-block mb-4">
                        <Sparkles className="w-12 h-12 text-ionized-gold mx-auto animate-pulse" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
                        WHY I <span className="text-electric-indigo">BUILD</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        I'm at the beginning of an exciting journey. Here's what drives me and where I'm headed.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                    {/* Card 1: Passion */}
                    <div className="vision-card group relative p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-electric-indigo/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(106,13,173,0.4)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 mb-6 rounded-xl bg-electric-indigo/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Code2 className="w-8 h-8 text-electric-indigo group-hover:drop-shadow-[0_0_20px_rgba(106,13,173,0.8)]" />
                            </div>

                            <h3 className="text-2xl font-display font-bold text-white mb-4">
                                THE PASSION
                            </h3>

                            <p className="text-gray-400 leading-relaxed mb-4">
                                I fell in love with code when I realized I could turn ideas into reality. Every project is a chance to learn, create, and solve real problems.
                            </p>

                            <div className="text-sm font-mono text-electric-indigo">
                                → Building since day one
                            </div>
                        </div>

                        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                    </div>

                    {/* Card 2: Vision */}
                    <div className="vision-card group relative p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-ionized-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,200,0,0.4)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-ionized-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 mb-6 rounded-xl bg-ionized-gold/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Target className="w-8 h-8 text-ionized-gold group-hover:drop-shadow-[0_0_20px_rgba(255,200,0,0.8)]" />
                            </div>

                            <h3 className="text-2xl font-display font-bold text-white mb-4">
                                THE VISION
                            </h3>

                            <p className="text-gray-400 leading-relaxed mb-4">
                                To become a developer who doesn't just write code, but crafts experiences. To bridge design and engineering seamlessly in every project.
                            </p>

                            <div className="text-sm font-mono text-ionized-gold">
                                → Aiming for excellence
                            </div>
                        </div>

                        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-ionized-gold/0 group-hover:border-ionized-gold/50 transition-all duration-300" />
                        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-ionized-gold/0 group-hover:border-ionized-gold/50 transition-all duration-300" />
                    </div>

                    {/* Card 3: Fresh Perspective */}
                    <div className="vision-card group relative p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-electric-indigo/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(106,13,173,0.4)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative z-10">
                            <div className="w-16 h-16 mb-6 rounded-xl bg-electric-indigo/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                <Rocket className="w-8 h-8 text-electric-indigo group-hover:drop-shadow-[0_0_20px_rgba(106,13,173,0.8)]" />
                            </div>

                            <h3 className="text-2xl font-display font-bold text-white mb-4">
                                FRESH EYES
                            </h3>

                            <p className="text-gray-400 leading-relaxed mb-4">
                                Being new means I bring curiosity, modern techniques, and hunger to prove myself. I learn fast, adapt quickly, and give 100% to every project.
                            </p>

                            <div className="text-sm font-mono text-electric-indigo">
                                → Ready to create impact
                            </div>
                        </div>

                        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                    </div>

                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 font-mono text-sm">
                        This is just the beginning. Let's build something amazing together.
                    </p>
                </div>

            </div>
        </section>
    );
};
