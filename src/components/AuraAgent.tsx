import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, ChevronDown, Send, Sparkles, Bot, Zap, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../utils/sounds';

// Knowledge Base for the Agent
const KNOWLEDGE_BASE = [
    {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'hola'],
        response: "Hello! I'm Aura, Daksh's AI assistant. How can I help you explore his portfolio today?"
    },
    {
        keywords: ['who', 'daksh', 'about', 'bio', 'name'],
        response: "Daksh Hiran is a Creative Developer & Designer based in Jaipur, India. He bridges the gap between aesthetics and code, creating stunning web experiences."
    },
    {
        keywords: ['skill', 'stack', 'tech', 'language', 'react', 'node', 'c++', 'typescript'],
        response: "Daksh is proficient in a wide range of technologies including C++, TypeScript, React, Node.js, MongoDB, Tailwind CSS, D3.js, WebGL, and Python. He specializes in both frontend and backend development."
    },
    {
        keywords: ['work', 'project', 'portfolio', 'experience', 'build'],
        response: "Daksh has built various projects showcasing his full-stack capabilities. You can explore them in the 'Specs' and 'Vision' sections. He focuses on rapid execution and high-quality design."
    },
    {
        keywords: ['contact', 'email', 'hire', 'reach', 'message'],
        response: "You can get in touch with Daksh directly using the Contact form in the 'Work With Me' section. He's currently open to new opportunities!"
    },
    {
        keywords: ['location', 'where', 'based', 'city', 'country'],
        response: "Daksh is based in Jaipur, India (IST timezone), but works effectively with clients globally."
    },
    {
        keywords: ['price', 'cost', 'rate', 'package'],
        response: "Daksh offers flexible engagement models. Please use the contact form to discuss your specific project needs and get a custom quote."
    },
    {
        keywords: ['design', 'ui', 'ux', 'figma'],
        response: "Daksh is not just a coder but also a designer. He uses Figma to craft beautiful interfaces before bringing them to life with code."
    }
];

const FAQ_DATA = [
    {
        id: 'availability',
        question: 'Are you available for new projects?',
        answer: 'Yes! I\'m currently open to new opportunities and excited to collaborate on interesting projects.',
        category: 'General'
    },
    {
        id: 'timeline',
        question: 'What\'s your typical project timeline?',
        answer: 'It depends on complexity, but I usually deliver MVPs within 2-4 weeks. I believe in rapid prototyping and iterative development.',
        category: 'Process'
    },
    {
        id: 'stack',
        question: 'What technologies do you work with?',
        answer: 'I specialize in React, TypeScript, Node.js, and modern web technologies. Check out my Tech Stack section for the full list!',
        category: 'Skills'
    }
];

type Message = {
    text: string;
    isUser: boolean;
    timestamp: Date;
};

export const AuraAgent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hi! I'm Aura. Ask me anything about Daksh's work, skills, or availability.", isUser: false, timestamp: new Date() }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleOpen = () => {
        setIsOpen(true);
        soundManager.play('click');
    };

    const handleClose = () => {
        setIsOpen(false);
        setExpandedQuestion(null);
    };

    const handleQuestionClick = (id: string) => {
        setExpandedQuestion(expandedQuestion === id ? null : id);
        soundManager.play('click');
    };

    const processMessage = async (text: string) => {
        // Add user message
        const userMsg: Message = { text, isUser: true, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);
        soundManager.play('click');

        // Simulate thinking delay
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let responseText = "I'm not sure about that specific detail, but I can tell you that Daksh is a very capable developer! Try asking about his skills, location, or how to contact him.";

            // Simple keyword matching
            for (const item of KNOWLEDGE_BASE) {
                if (item.keywords.some(keyword => lowerText.includes(keyword))) {
                    responseText = item.response;
                    break;
                }
            }

            const botMsg: Message = { text: responseText, isUser: false, timestamp: new Date() };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
            soundManager.play('success');
        }, 1000 + Math.random() * 1000); // Random delay between 1-2s
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            processMessage(inputValue);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={handleOpen}
                        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-electric-indigo to-purple-600 hover:from-purple-600 hover:to-electric-indigo flex items-center justify-center shadow-[0_0_30px_rgba(106,13,173,0.6)] hover:shadow-[0_0_50px_rgba(106,13,173,0.8)] transition-all duration-300 group"
                        data-hover
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Aura Icon */}
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <Sparkles className="absolute w-full h-full text-white animate-spin-slow opacity-70" />
                            <Brain className="absolute w-5 h-5 text-white z-10" />
                        </div>

                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-electric-indigo/40 animate-ping" />

                        {/* Badge */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-ionized-gold rounded-full flex items-center justify-center text-black text-[10px] font-bold animate-bounce">
                            AI
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        className="fixed bottom-6 right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-black/95 border border-electric-indigo/30 rounded-2xl backdrop-blur-2xl z-50 flex flex-col overflow-hidden shadow-[0_0_60px_rgba(106,13,173,0.4)]"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-electric-indigo/20 to-transparent flex-shrink-0">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-indigo to-purple-600 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        <Sparkles className="w-5 h-5 text-white relative z-10" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-white flex items-center gap-2">
                                            AURA AGENT
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        </h3>
                                        <p className="text-[10px] font-mono text-gray-400">Powered by Neural Logic</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
                                    data-hover
                                >
                                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-electric-indigo/30 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.isUser
                                                ? 'bg-electric-indigo text-white rounded-tr-none'
                                                : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* FAQ Quick Chips */}
                        <div className="px-6 py-2 flex gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
                            {FAQ_DATA.map((faq) => (
                                <button
                                    key={faq.id}
                                    onClick={() => processMessage(faq.question)}
                                    className="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 hover:bg-electric-indigo/20 hover:text-electric-indigo hover:border-electric-indigo/50 transition-all"
                                >
                                    {faq.question}
                                </button>
                            ))}
                        </div>

                        {/* Input Section */}
                        <div className="p-4 border-t border-white/10 bg-black/40 flex-shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask about skills, projects..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-electric-indigo focus:outline-none focus:bg-white/10 transition-all"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    className="w-12 h-12 flex items-center justify-center bg-electric-indigo hover:bg-purple-600 disabled:bg-gray-700 disabled:opacity-50 rounded-lg transition-all group"
                                    data-hover
                                >
                                    <Send className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
