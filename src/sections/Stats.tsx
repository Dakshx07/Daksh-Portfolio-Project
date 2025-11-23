import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Zap, Users, Award } from 'lucide-react';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Define highlight cards for the agency
const STATS = [
    {
        icon: Zap,
        label: 'Innovative Design',
        description: 'Cutting‑edge visual experiences that wow users',
        color: 'electric-indigo',
    },
    {
        icon: Code,
        label: 'Full‑Stack Development',
        description: 'End‑to‑end solutions from concept to launch',
        color: 'ionized-gold',
    },
    {
        icon: Users,
        label: 'Strategic Partnerships',
        description: 'Collaborating with brands to amplify impact',
        color: 'electric-indigo',
    },
    {
        icon: Award,
        label: 'Future‑Ready Solutions',
        description: 'Scalable tech that grows with your business',
        color: 'ionized-gold',
    },
];

export const Stats = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Simple scroll‑triggered animation for the background grid
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const trigger = ScrollTrigger.create({
            trigger: container,
            start: 'top 70%',
        });
        return () => trigger.kill();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative py-20 bg-gradient-to-b from-galactic-grey via-black to-galactic-grey overflow-hidden"
        >
            {/* Animated background grid */}
            <div
                className="absolute inset-0 bg-[linear-gradient(rgba(106,13,173,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(106,13,173,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 break-words">
                        BY THE <span className="text-electric-indigo">HIGHLIGHTS</span>
                    </h2>
                    <p className="text-gray-400 text-sm font-mono tracking-widest">
                        WHAT WE BRING TO YOUR PROJECTS
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(106,13,173,0.3)]"
                                data-hover
                            >
                                {/* Glow effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                                />

                                <div className="relative z-10">
                                    <div
                                        className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-${stat.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <Icon
                                            className={`w-8 h-8 text-${stat.color} group-hover:drop-shadow-[0_0_15px_currentColor] transition-all`}
                                        />
                                    </div>

                                    <h3 className={`text-xl font-display font-bold text-${stat.color} mb-2`}>
                                        {stat.label}
                                    </h3>
                                    <p className="text-sm text-gray-400 text-center">
                                        {stat.description}
                                    </p>
                                </div>

                                {/* Corner accents */}
                                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-electric-indigo/0 group-hover:border-electric-indigo/50 transition-all duration-300" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
