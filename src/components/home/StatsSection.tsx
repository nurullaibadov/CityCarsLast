import React, { useEffect, useRef, useState } from 'react';
import { Car, Users, Award, MapPin } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
    icon: React.ReactNode;
    value: number;
    label: string;
    suffix?: string;
    index: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, suffix = '', index }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const duration = 2500;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative p-10 rounded-[3rem] glass-card border-border/40 group hover:border-accent/40 transition-all duration-500 overflow-hidden"
        >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 accent-gradient opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-[2rem] accent-gradient group-hover:rotate-[10deg] transition-transform duration-500 shadow-xl">
                    <div className="text-accent-foreground">
                        {icon}
                    </div>
                </div>

                <div className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4 tracking-tighter">
                    {count.toLocaleString()}{suffix}
                </div>

                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    {label}
                </div>
            </div>
        </motion.div>
    );
};

const StatsSection: React.FC = () => {
    return (
        <section className="py-32 relative overflow-hidden bg-background">
            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground mb-8 leading-tight">
                            Excellence in Every <span className="text-gradient">Metric</span>.
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Our commitment to premium service is reflected in the numbers.
                            From fleet size to customer satisfaction, we set the industry standard.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatItem
                        index={0}
                        icon={<Car className="w-10 h-10" />}
                        value={250}
                        suffix="+"
                        label="Elite Fleet"
                    />
                    <StatItem
                        index={1}
                        icon={<Users className="w-10 h-10" />}
                        value={15000}
                        suffix="+"
                        label="Vetted Clients"
                    />
                    <StatItem
                        index={2}
                        icon={<Award className="w-10 h-10" />}
                        value={15}
                        suffix="+"
                        label="Years Leading"
                    />
                    <StatItem
                        index={3}
                        icon={<MapPin className="w-10 h-10" />}
                        value={12}
                        suffix="+"
                        label="Premium Hubs"
                    />
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
