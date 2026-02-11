import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    content: string;
    rating: number;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Aysel Mammadova',
        role: 'Business Executive',
        content: 'Exceptional service! The car was in perfect condition and the staff was incredibly professional. I\'ve been using CityCars for all my business trips in Baku.',
        rating: 5,
        image: '👩‍💼'
    },
    {
        id: 2,
        name: 'John Smith',
        role: 'Tourist',
        content: 'Best car rental experience I\'ve had! Easy booking process, great prices, and the vehicle exceeded my expectations. Highly recommend for anyone visiting Azerbaijan.',
        rating: 5,
        image: '👨‍💻'
    },
    {
        id: 3,
        name: 'Leyla Aliyeva',
        role: 'Event Planner',
        content: 'We rented multiple vehicles for our corporate event. The team was flexible, punctual, and the cars were immaculate. Will definitely use again!',
        rating: 5,
        image: '👩‍🎨'
    },
    {
        id: 4,
        name: 'David Chen',
        role: 'Travel Blogger',
        content: 'Amazing experience exploring Azerbaijan with their premium SUV. The 24/7 support was a lifesaver when I needed route assistance. Five stars!',
        rating: 5,
        image: '👨‍🚀'
    }
];

const TestimonialsCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToPrevious = () => {
        setIsAutoPlaying(false);
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setIsAutoPlaying(false);
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section className="py-32 relative bg-background overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 blur-[100px] rounded-full" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8">
                            Client <span className="text-gradient">Narratives</span>.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            The voices of our distinguished clientele reflect our unwavering
                            commitment to excellence and luxury.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto relative px-4 md:px-12">
                    <div className="relative h-[500px] md:h-[400px] overflow-hidden flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="absolute w-full"
                            >
                                <Card className="glass-card border-accent/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3rem] overflow-hidden group">
                                    <CardContent className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-10">
                                        {/* Avatar Column */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] accent-gradient flex items-center justify-center text-5xl md:text-6xl shadow-huge group-hover:rotate-3 transition-transform duration-500">
                                                {testimonials[currentIndex].image}
                                            </div>
                                            <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center shadow-xl border-4 border-background">
                                                <Quote className="w-5 h-5 text-accent" />
                                            </div>
                                        </div>

                                        {/* Content Column */}
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="flex justify-center md:justify-start gap-1 mb-6">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                                                ))}
                                            </div>

                                            <p className="text-xl md:text-2xl font-serif italic text-foreground leading-relaxed mb-8">
                                                "{testimonials[currentIndex].content}"
                                            </p>

                                            <div>
                                                <div className="text-2xl font-display font-bold text-foreground mb-1">
                                                    {testimonials[currentIndex].name}
                                                </div>
                                                <div className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
                                                    {testimonials[currentIndex].role}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Interface */}
                    <div className="flex items-center justify-between mt-12 px-4 md:px-0">
                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={goToPrevious}
                            className="rounded-2xl glass-card border-border/40 hover:bg-accent/10 text-foreground group px-6 h-14"
                        >
                            <ChevronLeft className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline font-bold uppercase tracking-widest text-xs">Previous</span>
                        </Button>

                        <div className="flex gap-3">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        setDirection(index > currentIndex ? 1 : -1);
                                        setCurrentIndex(index);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex
                                        ? 'w-12 accent-gradient shadow-[0_0_15px_rgba(255,215,0,0.5)]'
                                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size="lg"
                            onClick={goToNext}
                            className="rounded-2xl glass-card border-border/40 hover:bg-accent/10 text-foreground group px-6 h-14"
                        >
                            <span className="hidden sm:inline font-bold uppercase tracking-widest text-xs">Next</span>
                            <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
