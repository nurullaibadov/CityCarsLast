import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
    delay?: number;
    className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    direction = 'up',
    delay = 0,
    className = '',
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            element.classList.add('scroll-reveal-visible');
                        }, delay);
                        observer.unobserve(element);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [delay]);

    const getInitialTransform = () => {
        switch (direction) {
            case 'up':
                return 'translateY(50px)';
            case 'down':
                return 'translateY(-50px)';
            case 'left':
                return 'translateX(50px)';
            case 'right':
                return 'translateX(-50px)';
            case 'fade':
                return 'translateY(0)';
            default:
                return 'translateY(50px)';
        }
    };

    return (
        <div
            ref={elementRef}
            className={`scroll-reveal ${className}`}
            style={{
                opacity: 0,
                transform: getInitialTransform(),
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
            }}
        >
            {children}
            <style>{`
        .scroll-reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
        </div>
    );
};

export default ScrollReveal;
