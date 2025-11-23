import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Cpu, Lock } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

const SKILL_NODES = [
    { id: 'cpp', label: 'C++', x: 20, y: 15, type: 'core' },
    { id: 'ts', label: 'TypeScript', x: 35, y: 30, type: 'frontend' },
    { id: 'react', label: 'React', x: 50, y: 20, type: 'frontend' },
    { id: 'node', label: 'Node.js', x: 65, y: 30, type: 'backend' },
    { id: 'mongo', label: 'MongoDB', x: 70, y: 50, type: 'database' },
    { id: 'tailwind', label: 'Tailwind', x: 30, y: 55, type: 'frontend' },
    { id: 'd3', label: 'D3.js', x: 25, y: 75, type: 'frontend' },
    { id: 'webgl', label: 'WebGL', x: 55, y: 70, type: 'frontend' },
    { id: 'python', label: 'Python', x: 42, y: 85, type: 'backend' },
    { id: 'supabase', label: 'Supabase', x: 15, y: 45, type: 'database' },
];

const CONNECTIONS = [
    ['cpp', 'python'], ['ts', 'react'], ['ts', 'node'], ['react', 'tailwind'],
    ['react', 'webgl'], ['node', 'mongo'], ['node', 'supabase'], ['d3', 'react'],
    ['python', 'node'], ['tailwind', 'webgl']
];

type FilterType = 'all' | 'frontend' | 'backend' | 'core' | 'database';

export const Specs = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [animatedConnections, setAnimatedConnections] = useState<Set<string>>(new Set());
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const { getTransform } = useParallax();
    const animationFrameRef = useRef<number | undefined>(undefined);

    const getConnectedNodes = useCallback((nodeId: string) => {
        const connected = new Set<string>();
        CONNECTIONS.forEach(([start, end]) => {
            if (start === nodeId) connected.add(end);
            if (end === nodeId) connected.add(start);
        });
        return connected;
    }, []);

    const isConnectionActive = (start: string, end: string) => {
        if (!hoveredNode) return false;
        const connected = getConnectedNodes(hoveredNode);
        return (start === hoveredNode && connected.has(end)) || (end === hoveredNode && connected.has(start));
    };

    // Filter nodes based on active filter
    const filteredNodes = SKILL_NODES.filter(node => {
        if (activeFilter === 'all') return true;
        return node.type === activeFilter;
    });

    // Animate connections when hovered
    useEffect(() => {
        if (hoveredNode) {
            const connected = getConnectedNodes(hoveredNode);
            const connections = CONNECTIONS.filter(([start, end]) =>
                (start === hoveredNode && connected.has(end)) || (end === hoveredNode && connected.has(start))
            );

            let index = 0;
            const animateNext = () => {
                if (index < connections.length && connections[index]) {
                    const connection = connections[index];
                    setAnimatedConnections(prev => new Set(prev).add(connection.join('-')));
                    index++;
                    animationFrameRef.current = requestAnimationFrame(() => {
                        setTimeout(animateNext, 50);
                    });
                }
            };

            animateNext();
        } else {
            setAnimatedConnections(new Set());
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [hoveredNode, getConnectedNodes]);

    const filters = [
        { id: 'all', label: 'ALL SKILLS', icon: Layout },
        { id: 'frontend', label: 'FRONTEND', icon: Layout },
        { id: 'backend', label: 'BACKEND', icon: Server },
        { id: 'core', label: 'CORE', icon: Cpu }
    ];

    return (
        <section id="specs" className="min-h-screen bg-galactic-grey py-20 relative overflow-hidden flex items-center justify-center">

            <div className="container mx-auto px-4 h-[85vh] flex gap-6">

                {/* Sidebar: Filter Skills */}
                <div className="hidden lg:block w-64 bg-black/20 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xs font-mono text-gray-500 mb-6 tracking-widest">FILTER SKILLS</h3>

                    <div className="space-y-2">
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id as FilterType)}
                                className={`w-full text-left px-4 py-3 rounded border text-xs font-mono transition-all group ${activeFilter === filter.id
                                        ? 'bg-white/5 border-white/20 text-white'
                                        : 'border-transparent text-gray-600 hover:text-gray-400 hover:bg-white/5'
                                    }`}
                                data-hover
                            >
                                <div className="flex items-center gap-3">
                                    <filter.icon className={`w-4 h-4 transition-transform group-hover:scale-110`} />
                                    {filter.label}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-10">
                        <div className="p-4 border border-green-500/20 bg-green-500/5 rounded text-green-500 text-xs font-mono">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                OPTIMIZED
                            </div>
                            <div className="opacity-70 space-y-1">
                                <div>Performance: 60fps</div>
                                <div>Latency: &lt;12ms</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Display: Skill Map */}
                <div className="flex-1 bg-black/40 border border-electric-indigo/20 rounded-xl relative overflow-hidden">
                    {/* Header */}
                    <div className="absolute top-0 left-0 w-full p-6 border-b border-white/5 flex justify-between items-center z-20 bg-black/20 backdrop-blur-sm">
                        <h2 className="text-2xl font-display font-bold">
                            TECH <span className="text-electric-indigo">STACK</span>
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-gray-400">
                                {activeFilter === 'all' ? 'All' : activeFilter.toUpperCase()} ({filteredNodes.length} skills)
                            </span>
                            <div className="text-xs font-mono text-ionized-gold animate-pulse">INTERACTIVE MAP</div>
                        </div>
                    </div>

                    {/* Hex Grid Visualization */}
                    <div className="w-full h-full relative flex items-center justify-center pt-20">
                        <div
                            className="relative w-full h-full max-w-3xl max-h-[600px]"
                            style={{ transform: getTransform(0.3) }}
                        >

                            {/* SVG for Connections */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <defs>
                                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6A0DAD" stopOpacity="0.3" />
                                        <stop offset="50%" stopColor="#FFC800" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#6A0DAD" stopOpacity="0.3" />
                                    </linearGradient>

                                    {/* Electric flow animation */}
                                    <linearGradient id="electricFlow">
                                        <stop offset="0%" stopColor="#FFC800" stopOpacity="0">
                                            <animate attributeName="offset" from="0" to="1" dur="1s" repeatCount="indefinite" />
                                        </stop>
                                        <stop offset="50%" stopColor="#FFC800" stopOpacity="1">
                                            <animate attributeName="offset" from="0.5" to="1.5" dur="1s" repeatCount="indefinite" />
                                        </stop>
                                        <stop offset="100%" stopColor="#FFC800" stopOpacity="0">
                                            <animate attributeName="offset" from="1" to="2" dur="1s" repeatCount="indefinite" />
                                        </stop>
                                    </linearGradient>
                                </defs>

                                {CONNECTIONS.map(([start, end], i) => {
                                    const sNode = SKILL_NODES.find(n => n.id === start);
                                    const eNode = SKILL_NODES.find(n => n.id === end);
                                    if (!sNode || !eNode) return null;

                                    // Hide connection if either node is filtered out
                                    if (!filteredNodes.some(n => n.id === start) || !filteredNodes.some(n => n.id === end)) {
                                        return null;
                                    }

                                    const isActive = isConnectionActive(start, end);
                                    const connectionKey = `${start}-${end}`;
                                    const isAnimating = animatedConnections.has(connectionKey);

                                    return (
                                        <g key={i}>
                                            {/* Base line */}
                                            <line
                                                x1={`${sNode.x}%`} y1={`${sNode.y}%`}
                                                x2={`${eNode.x}%`} y2={`${eNode.y}%`}
                                                stroke={isActive ? '#FFC800' : 'url(#lineGradient)'}
                                                strokeWidth={isActive ? 2 : 1}
                                                opacity={isActive ? 1 : 0.3}
                                                strokeDasharray={isActive ? '0' : '4,4'}
                                                className="transition-all duration-300"
                                            />

                                            {/* Electric flow on active connections */}
                                            {isActive && isAnimating && (
                                                <line
                                                    x1={`${sNode.x}%`} y1={`${sNode.y}%`}
                                                    x2={`${eNode.x}%`} y2={`${eNode.y}%`}
                                                    stroke="url(#electricFlow)"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                />
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* Nodes */}
                            {filteredNodes.map((node) => {
                                const connected = getConnectedNodes(node.id);
                                const isActive = hoveredNode === node.id || (hoveredNode !== null && connected.has(hoveredNode));

                                return (
                                    <motion.div
                                        key={node.id}
                                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ delay: Math.random() * 0.3, duration: 0.4 }}
                                    >
                                        <motion.div
                                            className="cursor-pointer group"
                                            onMouseEnter={() => setHoveredNode(node.id)}
                                            onMouseLeave={() => setHoveredNode(null)}
                                            whileHover={{ scale: 1.15 }}
                                            data-hover
                                        >
                                            <div className={`w-20 h-20 flex items-center justify-center relative ${isActive ? 'text-black' : 'text-white'} transition-colors duration-300`}>
                                                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(106,13,173,0.5)]">
                                                    <polygon
                                                        points="50 0, 93 25, 93 75, 50 100, 7 75, 7 25"
                                                        fill={isActive ? '#FFC800' : '#0B0B0F'}
                                                        stroke={isActive ? '#FFC800' : '#6A0DAD'}
                                                        strokeWidth="2"
                                                        className="transition-all duration-300"
                                                    />
                                                </svg>
                                                <span className="relative z-10 text-[10px] font-mono font-bold tracking-wider text-center px-2 leading-tight">
                                                    {node.label}
                                                </span>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}

                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-20 left-6 w-4 h-4 border-t border-l border-white/30" />
                    <div className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-white/30" />
                </div>

                {/* Right Panel: Skill Info */}
                <div className="hidden xl:block w-80 bg-black/20 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative">
                    <h3 className="text-xs font-mono text-gray-500 mb-6 tracking-widest">&gt; SKILL_DETAILS</h3>

                    {hoveredNode ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-2">SELECTED</div>
                                <div className="text-2xl font-display font-bold text-ionized-gold">
                                    {SKILL_NODES.find(n => n.id === hoveredNode)?.label}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-2">CATEGORY</div>
                                <div className="text-sm text-white font-mono uppercase">
                                    {SKILL_NODES.find(n => n.id === hoveredNode)?.type}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs font-mono text-gray-500 mb-2">CONNECTIONS</div>
                                <div className="text-sm text-electric-indigo font-mono">
                                    {getConnectedNodes(hoveredNode).size} related skills
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <div className="text-xs font-mono text-green-500 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    PROFICIENT
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
                            <Lock className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                            <div className="text-xs text-gray-500 font-mono">
                                HOVER OVER A SKILL<br />TO VIEW DETAILS
                            </div>
                            <div className="w-12 h-1 bg-electric-indigo/20 mx-auto mt-4 rounded-full overflow-hidden">
                                <div className="w-1/2 h-full bg-electric-indigo animate-pulse" />
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};
