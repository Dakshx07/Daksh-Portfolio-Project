import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

export const useTextScramble = (finalText: string, trigger: boolean = true) => {
    const [displayText, setDisplayText] = useState(finalText);
    const [isScrambling, setIsScrambling] = useState(false);

    useEffect(() => {
        if (!trigger) {
            setDisplayText(finalText);
            return;
        }

        setIsScrambling(true);
        let frame = 0;
        const maxFrames = 30;

        const scramble = () => {
            if (frame >= maxFrames) {
                setDisplayText(finalText);
                setIsScrambling(false);
                return;
            }

            const progress = frame / maxFrames;
            const revealIndex = Math.floor(progress * finalText.length);

            const scrambled = finalText
                .split('')
                .map((char, index) => {
                    if (index < revealIndex) {
                        return finalText[index];
                    }
                    if (char === ' ') return ' ';
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');

            setDisplayText(scrambled);
            frame++;

            requestAnimationFrame(scramble);
        };

        const timeoutId = setTimeout(() => {
            scramble();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [finalText, trigger]);

    return { displayText, isScrambling };
};
