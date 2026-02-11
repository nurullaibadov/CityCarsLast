import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Gem, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';

const VIPSection: React.FC = () => {
    const perks = [
        {
            icon: <Gem className="w-8 h-8" />,
            title: "Exclusive Fleet",
            description: "Access to limited edition and custom-built vehicles not available to public."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Priority Delivery",
            description: "Get your car delivered to any location in Azerbaijan within 30 minutes."
        },
        {
            icon: <ShieldCheck className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-500" />,
            title: "Elite Protection",
            description: "Zero-deposit bookings and comprehensive VIP insurance coverage."
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] -ml-40 -mb-40" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-8">
                            <Crown className="w-4 h-4 text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">VIP Loyalty Program</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                            Elevate Your <br />
                            <span className="text-gradient">Driving Experience</span>
                        </h2>

                        <p className="text-xl text-muted-foreground mb-12 max-w-lg">
                            Our VIP program is designed for those who demand excellence.
                            Join an elite circle of drivers and enjoy unparalleled privileges
                            across our entire premium fleet.
                        </p>

                        <div className="space-y-8">
                            {perks.map((perk, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-accent shrink-0 group-hover:accent-gradient group-hover:text-accent-foreground transition-all duration-500">
                                        {perk.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                                            {perk.title}
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {perk.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <MagneticButton>
                                <Button className="h-16 px-10 rounded-2xl accent-gradient text-lg font-bold premium-glow flex items-center gap-3">
                                    Apply for VIP Access <ArrowRight className="w-5 h-5" />
                                </Button>
                            </MagneticButton>
                        </div>
                    </motion.div>

                    {/* VIP Card Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative"
                    >
                        <div className="relative z-20 glass-card p-1 rounded-[40px] border-accent/30 shadow-[0_0_50px_rgba(227,27,35,0.2)] overflow-hidden group">
                            <div className="absolute inset-0 premium-gradient opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                            <div className="relative bg-background/40 backdrop-blur-xl p-12 rounded-[38px] border border-white/5 space-y-12">
                                <div className="flex justify-between items-start">
                                    <div className="w-24 h-24 rounded-3xl accent-gradient flex items-center justify-center">
                                        <Crown className="w-12 h-12 text-accent-foreground" />
                                    </div>
                                    <Sparkles className="w-8 h-8 text-accent animate-pulse-slow" />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-display font-bold mb-2 tracking-tighter">CITYCARS ELITE</h3>
                                    <p className="text-muted-foreground text-sm uppercase tracking-[0.3em]">Unlimited Luxury Member</p>
                                </div>

                                <div className="pt-8 border-t border-border/50 flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Card Holder</p>
                                        <p className="text-lg font-mono font-bold">PREMIUM USER</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-muted-foreground uppercase mb-1">Expires</p>
                                        <p className="text-lg font-mono font-bold text-accent">PERPETUAL</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background cards */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/20 rounded-[40px] blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -right-12 w-32 h-32 glass-card rounded-2xl border-accent/20 flex items-center justify-center -z-10"
                        >
                            <Gem className="w-12 h-12 text-accent/50" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default VIPSection;
