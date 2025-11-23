import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { SoundToggle } from './components/SoundToggle';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { Home } from './sections/Home';
import { Viewfinder } from './sections/Viewfinder';
import { Vision } from './sections/Vision';
import { Identity } from './sections/Identity';
import { Stats } from './sections/Stats';
import { Specs } from './sections/Specs';
import { Book } from './sections/Book';
import { AuraAgent } from './components/AuraAgent';
import { useKonamiCode } from './hooks/useKonamiCode';
import { initSounds } from './utils/sounds';

function App() {
  const [loading, setLoading] = useState(true);
  const easterEggActivated = useKonamiCode();

  useEffect(() => {
    // Initialize sound system
    initSounds();
  }, []);

  return (
    <div className="min-h-screen bg-galactic-grey text-clean-lumen selection:bg-electric-indigo selection:text-white">
      <Cursor />
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollProgress />
          <Navbar />
          <SoundToggle />
          <PerformanceDashboard />
          <AuraAgent />

          {/* Easter Egg Notification */}
          <AnimatePresence>
            {easterEggActivated && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/90 border border-ionized-gold px-8 py-4 rounded-lg backdrop-blur-xl shadow-[0_0_30px_rgba(255,200,0,0.5)]"
              >
                <div className="text-center">
                  <div className="text-ionized-gold font-mono text-sm mb-1">⚡ WELCOME ⚡</div>
                  <div className="text-white font-display">DEVELOPER MODE UNLOCKED</div>
                  <div className="text-xs text-gray-400 mt-2 font-mono">
                    Press <span className="text-ionized-gold">Ctrl+Shift+D</span> for Performance Dashboard
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="relative z-10">
            <Home />
            <Viewfinder />
            <Vision />
            <Identity />
            <Stats />
            <Specs />
            <Book />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
