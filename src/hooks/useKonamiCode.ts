import { useEffect, useState } from 'react';

const SECRET_CODE = 'DAKSH';

export const useKonamiCode = () => {
    const [activated, setActivated] = useState(false);
    const [inputBuffer, setInputBuffer] = useState('');

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            const newBuffer = (inputBuffer + e.key.toUpperCase()).slice(-SECRET_CODE.length);
            setInputBuffer(newBuffer);

            if (newBuffer === SECRET_CODE) {
                setActivated(true);

                // Reset after 5 seconds
                setTimeout(() => {
                    setActivated(false);
                    setInputBuffer('');
                }, 5000);
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [inputBuffer]);

    return activated;
};
