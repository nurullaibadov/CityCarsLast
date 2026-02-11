import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
    text,
    className = "",
    delay = 0,
    stagger = 0.02
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const childVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            }
        },
    };

    return (
        <span ref={ref} className={`inline-block perspective-1000 ${className}`}>
            <motion.span
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-wrap"
            >
                {characters.map((char, index) => (
                    <motion.span
                        key={index}
                        variants={childVariants}
                        className="inline-block"
                        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.span>
        </span>
    );
};

export default ScrollRevealText;
