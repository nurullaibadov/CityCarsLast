import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    onClick,
    disabled = false
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current || disabled) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();

        // Calculate relative position from center
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        // Magnetic pull strength (20-30% of distance is a good feel)
        setPosition({ x: x * 0.35, y: y * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            className={`relative inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                onClick={onClick}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </div>
    );
};

export default MagneticButton;
