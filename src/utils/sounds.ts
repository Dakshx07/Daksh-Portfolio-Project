// Enhanced sound manager with Web Audio API for audible beeps
class SoundManager {
    private audioContext: AudioContext | null = null;
    private muted: boolean = false;

    constructor() {
        // Check if user has previously muted
        const savedMuteState = localStorage.getItem('soundsMuted');
        this.muted = savedMuteState === 'true';

        // Initialize AudioContext on first user interaction
        if (typeof window !== 'undefined') {
            window.addEventListener('click', () => this.initAudioContext(), { once: true });
        }
    }

    private initAudioContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    // Create and play a beep sound
    private playBeep(frequency: number, duration: number, volume: number = 0.5) {
        if (this.muted || !this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';

            // Envelope for smooth sound
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (error) {
            // Silently fail if audio API not supported
            console.warn('Audio playback failed:', error);
        }
    }

    // Play different sounds for different interactions
    play(soundType: string) {
        this.initAudioContext();

        switch (soundType) {
            case 'hover':
                this.playBeep(800, 0.05, 0.3); // High pitch, very short, quiet
                break;
            case 'click':
                this.playBeep(600, 0.08, 0.4); // Medium pitch, short, moderate
                break;
            case 'success':
                // Two-tone success sound
                this.playBeep(600, 0.1, 0.4);
                setTimeout(() => this.playBeep(800, 0.1, 0.4), 100);
                break;
            case 'error':
                this.playBeep(200, 0.15, 0.5); // Low pitch, longer, louder
                break;
            default:
                this.playBeep(700, 0.06, 0.3);
        }
    }

    // Toggle mute
    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('soundsMuted', this.muted.toString());
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Initialize on module load
export const initSounds = () => {
    // AudioContext will be initialized on first user click
    console.log('Sound system ready');
};
