import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const Cursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        let currentTarget: HTMLElement | null = null;

        const moveCursor = (e: MouseEvent) => {
            let targetX = e.clientX;
            let targetY = e.clientY;

            // Magnetic effect - pull toward hoverable elements
            if (currentTarget && isHovering) {
                const rect = currentTarget.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
                );

                if (distance < 80) {
                    const pullStrength = 0.3;
                    targetX = e.clientX + (centerX - e.clientX) * pullStrength;
                    targetY = e.clientY + (centerY - e.clientY) * pullStrength;
                }
            }

            gsap.to(cursor, {
                x: targetX,
                y: targetY,
                duration: 0.1,
                ease: 'power2.out'
            });

            gsap.to(follower, {
                x: targetX,
                y: targetY,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const hoverElement = target.closest('button, a, [data-hover]');

            if (hoverElement) {
                currentTarget = hoverElement as HTMLElement;
                setIsHovering(true);

                // Determine cursor type
                if (target.closest('input, textarea')) {
                    setCursorType('text');
                } else {
                    setCursorType('pointer');
                }
            } else {
                currentTarget = null;
                setIsHovering(false);
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isHovering]);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        if (isHovering) {
            gsap.to(cursor, {
                scale: cursorType === 'text' ? 0 : 1,
                duration: 0.2
            });

            gsap.to(follower, {
                scale: cursorType === 'text' ? 0.5 : 3,
                borderColor: '#FFC800',
                backgroundColor: 'rgba(255, 200, 0, 0.1)',
                duration: 0.3
            });
        } else {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.2
            });

            gsap.to(follower, {
                scale: 1,
                borderColor: '#E0E0E0',
                backgroundColor: 'transparent',
                duration: 0.3
            });
        }
    }, [isHovering, cursorType]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-ionized-gold rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-clean-lumen rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
            />
        </>
    );
};
