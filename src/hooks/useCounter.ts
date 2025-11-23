import { useEffect, useState, useRef } from 'react';

interface CounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export const useCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: CounterProps) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const countRef = useRef(0);
    const startTimeRef = useRef<number>(0);

    useEffect(() => {
        if (!hasStarted) return;

        const animate = (currentTime: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime;
            }

            const elapsed = currentTime - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = (t: number) => t * (2 - t);
            const easedProgress = easeOutQuad(progress);

            countRef.current = Math.floor(easedProgress * end);
            setCount(countRef.current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    const start = () => setHasStarted(true);

    return {
        value: `${prefix}${count.toLocaleString()}${suffix}`,
        start,
        hasStarted
    };
};
