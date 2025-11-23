import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    tech: string[];
    metrics: { label: string; value: string }[];
    image: string;
    github?: string;
    live?: string;
}

const PROJECTS: Project[] = [
    {
        id: 1,
        title: "SENTINEL AI",
        category: "AI / CYBERSECURITY",
        description: "AI-driven security platform for codebase vulnerability detection. Top 10 Finalist project with advanced monitoring and interactive scripting capabilities for Back4App applications.",
        tech: ["TypeScript", "React", "Back4App", "CodeMirror", "AI/ML"],
        metrics: [
            { label: "Achievement", value: "Top 10" },
            { label: "Security Level", value: "Enterprise" }
        ],
        image: "/assets/sentinel_preview.png",
        github: "https://github.com/Dakshx07/sentinel-back4app",
        live: "https://sentinellai.netlify.app/"
    },
    {
        id: 2,
        title: "AYUCHAIN",
        category: "BLOCKCHAIN / HEALTHCARE",
        description: "Blockchain-based prescription security platform combining AI verification with immutable records to ensure authenticity and prevent fraud in healthcare.",
        tech: ["React", "Blockchain", "AI", "Tailwind CSS", "Node.js"],
        metrics: [
            { label: "Security", value: "Military-Grade" },
            { label: "Verification", value: "AI-Powered" }
        ],
        image: "/assets/ayuchain_preview.png",
        github: "https://github.com/lakshitsoni26/MediTech"
    }
];

export const Viewfinder = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        // Horizontal Scroll Animation
        const scrollTween = gsap.to(section, {
            x: () => -(section.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: "+=3000", // Adjust scroll length
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        });

        return () => {
            scrollTween.kill();
        };
    }, []);

    return (
        <section ref={triggerRef} className="relative h-screen overflow-hidden bg-galactic-grey">
            {/* Section Header (Fixed) */}
            <div className="absolute top-10 left-10 z-20 mix-blend-difference">
                <h2 className="text-4xl font-display text-clean-lumen tracking-wider">
                    VIEWFINDER <span className="text-ionized-gold text-sm align-top">02</span>
                </h2>
                <p className="text-electric-indigo font-mono text-sm mt-2">PROJECT ARCHIVE</p>
            </div>

            {/* Horizontal Container */}
            <div ref={sectionRef} className="flex h-full items-center pl-[20vw] pr-[20vw] gap-[10vw] w-max">
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="group relative w-[80vw] md:w-[60vw] lg:w-[40vw] h-[60vh] flex-shrink-0 perspective-1000"
                    >
                        {/* Card Content */}
                        <div className="relative w-full h-full bg-galactic-grey/80 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-ionized-gold/50">

                            {/* Image Background */}
                            <div className="absolute inset-0">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-galactic-grey via-galactic-grey/50 to-transparent" />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-electric-indigo font-mono text-xs tracking-widest mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold text-clean-lumen mb-4">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 mb-6 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="px-2 py-1 border border-white/20 text-xs text-gray-300 rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Metrics (Reveal on Hover) */}
                                    <div className="flex gap-8 border-t border-white/10 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                                        {project.metrics.map((metric, i) => (
                                            <div key={i}>
                                                <div className="text-2xl font-bold text-ionized-gold">{metric.value}</div>
                                                <div className="text-xs text-gray-500 font-mono uppercase">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-8 right-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-ionized-gold transition-colors"
                                        >
                                            <Github className="w-5 h-5 text-clean-lumen" />
                                        </a>
                                    )}
                                    {project.live && (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-ionized-gold transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5 text-clean-lumen" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
