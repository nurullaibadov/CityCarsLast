import React from 'react';
import { motion } from 'framer-motion';

const brands = [
    "Mercedes-Benz", "Rolls-Royce", "Bentley", "Porsche", "BMW", "Audi", "Range Rover", "Tesla", "Lamborghini", "Ferrari"
];

const BrandMarquee: React.FC = () => {
    return (
        <section className="py-12 bg-background border-y border-border/50 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex select-none overflow-hidden">
                <motion.div
                    className="flex gap-20 items-center whitespace-nowrap px-10"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {[...brands, ...brands, ...brands].map((brand, index) => (
                        <span
                            key={index}
                            className="text-4xl md:text-6xl font-display font-bold text-muted-foreground/20 hover:text-accent/40 transition-colors cursor-default tracking-tighter"
                        >
                            {brand}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandMarquee;
