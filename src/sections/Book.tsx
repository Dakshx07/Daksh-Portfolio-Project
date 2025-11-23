import { useState } from 'react';
import { Send } from 'lucide-react';

export const Book = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch("https://formspree.io/f/xvgydwve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                alert('Message sent successfully! I\'ll get back to you soon.');
                setFormState({ name: '', email: '', message: '' });
            } else {
                alert('Oops! There was a problem sending your message. Please try again.');
            }
        } catch (error) {
            alert('Oops! There was a problem sending your message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div id="book" className="bg-galactic-grey">

            {/* SECTION 2: CONTACT */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">

                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
                            GET IN <span className="text-electric-indigo">TOUCH</span>
                        </h2>
                        <p className="text-gray-400 font-mono text-sm tracking-widest mb-8">LET'S BUILD SOMETHING TOGETHER</p>

                        <div className="p-6 rounded-xl bg-black/30 border border-white/10 font-mono text-sm text-gray-400 space-y-2">
                            <div className="flex gap-2">
                                <span className="text-green-500">➜</span>
                                <span>Open to new projects</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-green-500">➜</span>
                                <span>Response time: &lt;24 hours</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="text-green-500">➜</span>
                                <span className="animate-pulse">Ready when you are...</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="group">
                                <label className="block text-xs font-mono text-electric-indigo mb-2 group-focus-within:text-ionized-gold transition-colors">
                                    YOUR NAME
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-clean-lumen focus:border-ionized-gold focus:outline-none focus:bg-white/10 transition-all placeholder-gray-700"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-mono text-electric-indigo mb-2 group-focus-within:text-ionized-gold transition-colors">
                                    YOUR EMAIL
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-clean-lumen focus:border-ionized-gold focus:outline-none focus:bg-white/10 transition-all placeholder-gray-700"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div className="group">
                                <label className="block text-xs font-mono text-electric-indigo mb-2 group-focus-within:text-ionized-gold transition-colors">
                                    YOUR MESSAGE
                                </label>
                                <textarea
                                    name="message"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-clean-lumen focus:border-ionized-gold focus:outline-none focus:bg-white/10 transition-all h-32 resize-none placeholder-gray-700"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-electric-indigo hover:bg-electric-indigo/80 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all group relative overflow-hidden shadow-[0_0_20px_rgba(106,13,173,0.3)] hover:shadow-[0_0_30px_rgba(106,13,173,0.6)]"
                            >
                                <span className="relative z-10 flex items-center gap-2 font-display tracking-wider">
                                    {isSending ? 'SENDING...' : 'SEND MESSAGE'}
                                    {!isSending && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                </span>

                                <div className="absolute inset-0 bg-gradient-to-r from-electric-indigo via-purple-500 to-electric-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
};
