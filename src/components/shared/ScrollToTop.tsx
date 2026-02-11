import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <Button
                    onClick={scrollToTop}
                    size="icon"
                    className="fixed bottom-48 right-8 z-50 w-12 h-12 rounded-full accent-gradient text-accent-foreground shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 animate-bounce-slow"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </Button>
            )}
        </>
    );
};

export default ScrollToTop;
