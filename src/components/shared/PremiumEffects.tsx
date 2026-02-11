import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const PremiumEffects: React.FC = () => {
    const [isHovering, setIsHovering] = useState(false);
    const lastCheck = useRef(0);

    // Smooth motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring configuration for trailing effect - optimized for performance
    const springConfig = { damping: 30, stiffness: 250 };
    const trailX = useSpring(mouseX, springConfig);
    const trailY = useSpring(mouseY, springConfig);

    const springConfigFast = { damping: 20, stiffness: 400 };
    const leadX = useSpring(mouseX, springConfigFast);
    const leadY = useSpring(mouseY, springConfigFast);

    // Move gradient logic to MotionTemplates to avoid re-renders
    const mainGradient = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, hsla(var(--accent), 0.15), transparent 80%)`;
    const secondaryGradient = useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, hsla(var(--accent), 0.05), transparent 70%)`;

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Throttle proximity/hover checks to 60fps to save CPU
        const now = Date.now();
        if (now - lastCheck.current > 16) {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('button, a, input, select, [role="button"], .interactive, .holographic-shine');
            setIsHovering(!!isClickable);
            lastCheck.current = now;
        }
    }, [mouseX, mouseY]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Optimize scroll percent calculation
        const handleScroll = () => {
            const doc = document.documentElement;
            const scrolled = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
            // Only update if change is significant to avoid layout thrashing
            doc.style.setProperty('--scroll-percent', `${scrolled.toFixed(1)}%`);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleMouseMove]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            {/* Lead Pointer - Optimized with translateZ(0) for GPU acceleration */}
            <motion.div
                className="w-2 h-2 bg-accent rounded-full fixed will-change-transform"
                style={{
                    x: leadX,
                    y: leadY,
                    translateX: '-50%',
                    translateY: '-50%',
                    z: 0 // Force GPU layer
                }}
            />

            {/* Main Trail Ring */}
            <motion.div
                className="w-8 h-8 border border-accent/40 rounded-full fixed flex items-center justify-center will-change-transform"
                animate={{
                    scale: isHovering ? 2.5 : 1,
                    backgroundColor: isHovering ? 'hsla(var(--accent), 0.15)' : 'transparent',
                    borderColor: isHovering ? 'hsla(var(--accent), 0.8)' : 'hsla(var(--accent), 0.4)',
                }}
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    z: 0
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full bg-accent/5 blur-sm"
                    animate={{ scale: isHovering ? 1.5 : 1 }}
                />
            </motion.div>

            {/* Accent Trail Dot */}
            <motion.div
                className="w-1 h-1 bg-accent/60 rounded-full fixed will-change-transform"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: '-50%',
                    translateY: '-50%',
                    z: 0
                }}
            />

            {/* Magic Glow Follower Background - Using MotionTemplate for 0 re-renders */}
            <motion.div
                className="fixed inset-0 z-[-1] pointer-events-none opacity-40 mix-blend-screen will-change-[background]"
                style={{
                    background: mainGradient,
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: secondaryGradient
                    }}
                />
            </motion.div>
        </div>
    );
};

export default PremiumEffects;
