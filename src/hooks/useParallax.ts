import { useEffect, useState } from 'react';

interface ParallaxValues {
    x: number;
    y: number;
}

export const useParallax = () => {
    const [mousePos, setMousePos] = useState<ParallaxValues>({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e: MouseEvent) => {
            if (isMobile) return; // Disable parallax on mobile

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate offset from center (normalized to -1 to 1)
            const x = (e.clientX - centerX) / centerX;
            const y = (e.clientY - centerY) / centerY;

            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMobile]);

    // Returns transform string for given depth multiplier
    const getTransform = (depth: number = 1) => {
        if (isMobile) return 'translate(0px, 0px)'; // No parallax on mobile

        const moveX = mousePos.x * depth * 20; // max 20px movement
        const moveY = mousePos.y * depth * 20;
        return `translate(${moveX}px, ${moveY}px)`;
    };

    return { mousePos, getTransform, isMobile };
};
