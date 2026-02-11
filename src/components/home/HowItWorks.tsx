import React from 'react';
import { Search, Calendar, Key, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepProps {
    number: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
    isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ number, icon, title, description, index, isLast }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="relative flex flex-col items-center text-center group"
        >
            {/* Connector Line Animation */}
            {!isLast && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/50 to-transparent -z-10" />
            )}

            {/* Icon Bubble */}
            <div className="relative mb-8">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-32 h-32 rounded-[2.5rem] accent-gradient flex items-center justify-center shadow-huge relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-accent-foreground drop-shadow-lg">
                        {icon}
                    </div>
                </motion.div>

                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-foreground text-background flex items-center justify-center font-display font-bold text-lg shadow-xl outline outline-4 outline-background">
                    {number}
                </div>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">
                {description}
            </p>
        </motion.div>
    );
};

const HowItWorks: React.FC = () => {
    return (
        <section className="py-32 relative bg-background overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

            {/* Liquid Process Wave (Desktop Only) */}
            <svg className="absolute top-[40%] left-0 w-full h-32 opacity-10 pointer-events-none hidden lg:block" viewBox="0 0 1440 320">
                <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    fill="none"
                    stroke="url(#wave-gradient)"
                    strokeWidth="4"
                    d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,213.3C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96"
                />
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsla(var(--accent), 0.5)" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8">
                            A Seamless <span className="text-gradient">Experience</span>.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            We've refined every touchpoint of our booking process to ensure
                            effortless transitions from selection to the open road.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 max-w-7xl mx-auto">
                    <Step
                        index={0}
                        number={1}
                        icon={<Search className="w-12 h-12" />}
                        title="Selection"
                        description="Explore our curated collection of elite vehicles matched to your style."
                    />
                    <Step
                        index={1}
                        number={2}
                        icon={<Calendar className="w-12 h-12" />}
                        title="Configuration"
                        description="Tailor your journey with bespoke upgrades and flexible scheduling."
                    />
                    <Step
                        index={2}
                        number={3}
                        icon={<CheckCircle className="w-12 h-12" />}
                        title="Confirmation"
                        description="Finalize your reservation instantly through our encrypted protocol."
                    />
                    <Step
                        index={3}
                        number={4}
                        icon={<Key className="w-12 h-12" />}
                        title="Handover"
                        description="Experience the thrill as our specialists deliver excellence to your doorstep."
                        isLast
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
