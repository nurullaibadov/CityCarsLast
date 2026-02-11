import React, { useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
    Smartphone, Apple, PlayCircle, Star, ArrowRight, Download,
    ShieldCheck, MapPin, Calculator, Home, Car, Cpu, User, Key, Lock, Unlock, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';

const AppShowcase: React.FC = () => {
    const [activeScreen, setActiveScreen] = useState('home');
    const [isIslandExpanded, setIsIslandExpanded] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [bookingStep, setBookingStep] = useState('idle'); // idle, processing, success

    // 360 Rotation Controls - Optimized with better physics
    const rotationX = useMotionValue(0);
    const rotationY = useMotionValue(0);

    const springConfig = { damping: 40, stiffness: 200, mass: 1 };
    const springX = useSpring(rotationX, springConfig);
    const springY = useSpring(rotationY, springConfig);

    // Transform drag progress to degrees - simplified transforms for performance
    const rotateX = useTransform(springY, [-300, 300], [15, -15]);
    const rotateY = useTransform(springX, [-300, 300], [-45, 45]);

    const handleDrag = (_: any, info: any) => {
        rotationX.set(rotationX.get() + info.delta.x);
        rotationY.set(rotationY.get() + info.delta.y);
    };

    const resetRotation = () => {
        rotationX.set(0);
        rotationY.set(0);
    };

    // Memoize static elements to prevent unnecessary re-renders
    const navItems = useMemo(() => [
        { id: 'home', icon: Home },
        { id: 'fleet', icon: Car },
        { id: 'keys', icon: Key },
        { id: 'ai', icon: Cpu }
    ], []);

    return (
        <section className="py-32 relative overflow-hidden bg-background">
            {/* Ambient Background Glows - Optimized with will-change */}
            <div className="absolute top-0 right-0 w-1/4 h-1/4 accent-gradient opacity-10 blur-[150px] rounded-full will-change-transform" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 accent-gradient opacity-10 blur-[150px] rounded-full will-change-transform" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                    {/* Visual Side: Interactive 360 Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="relative perspective-2000 py-12"
                    >
                        {/* 360 Guidance UI */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-3 glass-card px-4 py-2 rounded-full border-accent/20 animate-bounce pointer-events-none z-30">
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent">Drag to Rotate 360°</span>
                        </div>

                        <motion.div
                            style={{ rotateX, rotateY, perspective: 2000 }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            onDrag={handleDrag}
                            className="relative mx-auto w-[300px] h-[620px] md:w-[340px] md:h-[700px] cursor-grab active:cursor-grabbing preserve-3d group will-change-transform"
                        >
                            {/* Device Frame with High-Gloss Bezels */}
                            <div className="absolute inset-0 bg-[#080808] rounded-[55px] border-[12px] border-[#1a1a1a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden will-change-transform">

                                {/* Inner Screen Content */}
                                <div className="absolute inset-0 bg-background flex flex-col overflow-hidden">
                                    {/* Status Bar */}
                                    <div className="h-12 px-8 flex justify-between items-center bg-black/40 backdrop-blur-md z-40">
                                        <span className="text-[10px] font-bold">9:41</span>
                                        <div className="flex gap-1.5 items-center">
                                            <div className="w-4 h-2.5 border border-white/30 rounded-sm relative">
                                                <div className="absolute inset-0.5 bg-white/80 rounded-sm w-3/4" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* App Container */}
                                    <div className="flex-1 relative flex flex-col pt-4">
                                        <AnimatePresence mode="wait" initial={false}>
                                            {activeScreen === 'home' && (
                                                <motion.div
                                                    key="home"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar will-change-[opacity,transform]"
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-display font-black text-xs tracking-widest text-accent">CITYCARS</span>
                                                        <div className="w-10 h-10 rounded-2xl glass-card border-accent/20 flex items-center justify-center">
                                                            <User className="w-4 h-4 text-accent" />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h3 className="text-xl font-bold">Welcome back,</h3>
                                                        <p className="text-sm text-muted-foreground">Select your luxury companion</p>
                                                    </div>

                                                    <div className="glass-card elite-glass rounded-3xl p-4 space-y-4">
                                                        <div className="aspect-video bg-muted/20 rounded-2xl overflow-hidden relative group/card">
                                                            <div className="absolute inset-0 accent-gradient opacity-10" />
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                                <Button
                                                                    onClick={() => {
                                                                        setBookingStep('processing');
                                                                        setTimeout(() => setBookingStep('success'), 2000);
                                                                    }}
                                                                    size="sm"
                                                                    className="rounded-full accent-gradient h-8 text-[10px] font-bold"
                                                                >
                                                                    Quick Book
                                                                </Button>
                                                            </div>
                                                            <div className="absolute bottom-2 left-2 text-[10px] font-bold">Lambo Revuelto</div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="px-3 py-1 bg-accent/20 rounded-full text-[10px] font-bold">AVAILABLE</div>
                                                            <span className="text-xs font-bold">$1,200<span className="text-[8px] opacity-50">/DAY</span></span>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="accent-gradient rounded-3xl p-4 flex flex-col gap-2">
                                                            <MapPin className="w-4 h-4 text-accent-foreground" />
                                                            <span className="text-[10px] font-bold">Track Order</span>
                                                        </div>
                                                        <div className="glass-card border-accent/10 rounded-3xl p-4 flex flex-col gap-2">
                                                            <ShieldCheck className="w-4 h-4 text-accent" />
                                                            <span className="text-[10px] font-bold">Insurance</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeScreen === 'fleet' && (
                                                <motion.div
                                                    key="fleet"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar will-change-[opacity,transform]"
                                                >
                                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                                        <Car className="text-accent w-5 h-5" /> 360 Fleet
                                                    </h3>
                                                    <div className="space-y-4">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="flex items-center gap-4 p-3 glass-card border-border/50 rounded-2xl">
                                                                <div className="w-16 h-12 bg-muted/20 rounded-xl" />
                                                                <div className="flex-1">
                                                                    <div className="h-2.5 w-20 bg-foreground/10 rounded-full mb-2" />
                                                                    <div className="h-1.5 w-12 bg-muted rounded-full" />
                                                                </div>
                                                                <ArrowRight className="w-4 h-4 text-accent" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeScreen === 'ai' && (
                                                <motion.div
                                                    key="ai"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-6 space-y-8 flex-1 flex flex-col items-center justify-center text-center will-change-[opacity,transform]"
                                                >
                                                    <div className="w-20 h-20 rounded-full accent-gradient flex items-center justify-center shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)] animate-pulse">
                                                        <Cpu className="w-10 h-10 text-accent-foreground" />
                                                    </div>
                                                    <div className="space-y-4">
                                                        <h3 className="text-xl font-bold">AI Concierge</h3>
                                                        <p className="text-xs text-muted-foreground leading-relaxed">Analyzing your preferences for the perfect Baku journey...</p>
                                                    </div>
                                                    <div className="w-full h-12 glass-card border-accent/20 rounded-2xl flex items-center justify-center overflow-hidden">
                                                        <motion.div
                                                            animate={{ width: ['0%', '100%', '0%'] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                            className="h-full bg-accent/20 rounded-2xl"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}

                                            {activeScreen === 'keys' && (
                                                <motion.div
                                                    key="keys"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="p-6 space-y-8 flex-1 flex flex-col items-center justify-center will-change-[opacity,transform]"
                                                >
                                                    <div className="relative group/key">
                                                        <motion.div
                                                            animate={{ rotate: isLocked ? 0 : 5 }}
                                                            className="w-48 h-72 glass-card elite-glass rounded-[3rem] border-accent/20 flex flex-col items-center justify-between p-8 shadow-huge relative overflow-hidden"
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
                                                            <div className="text-accent">
                                                                <span className="font-display font-black text-xs tracking-[0.3em]">CITYCARS</span>
                                                            </div>
                                                            <div className="flex flex-col gap-6 w-full">
                                                                <Button
                                                                    onClick={() => {
                                                                        setIsIslandExpanded(true);
                                                                        setIsLocked(!isLocked);
                                                                        setTimeout(() => setIsIslandExpanded(false), 3000);
                                                                    }}
                                                                    className={`w-full h-16 rounded-2xl flex items-center justify-center transition-all ${isLocked ? 'bg-muted/10 hover:bg-muted/20' : 'accent-gradient shadow-[0_0_30px_rgba(var(--accent-rgb),0.3)]'}`}
                                                                >
                                                                    {isLocked ? <Unlock className="w-6 h-6 text-accent" /> : <Lock className="w-6 h-6 text-accent-foreground" />}
                                                                </Button>
                                                                <Button className="w-full h-16 rounded-2xl bg-muted/10 hover:bg-muted/20 flex items-center justify-center">
                                                                    <div className="w-6 h-6 rounded-full border-2 border-accent/50 flex items-center justify-center">
                                                                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                                                    </div>
                                                                </Button>
                                                            </div>
                                                            <div className="text-center">
                                                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Digital Key Active</p>
                                                            </div>
                                                        </motion.div>
                                                        {/* Signal Ripples when unlocking */}
                                                        {!isLocked && (
                                                            <div className="absolute inset-0 pointer-events-none">
                                                                {[1, 2].map(i => (
                                                                    <motion.div
                                                                        key={i}
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 2] }}
                                                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                                                        className="absolute inset-0 border border-accent/20 rounded-[3rem]"
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-center text-muted-foreground font-medium px-4">Tap the unlock icon to connect with your vehicle via secure Bluetooth.</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Interactive Tab Bar */}
                                    <div className="h-20 bg-card/80 backdrop-blur-2xl border-t border-border flex justify-around items-center px-4 relative">
                                        {navItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setActiveScreen(item.id)}
                                                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${activeScreen === item.id ? 'text-accent scale-110' : 'text-muted-foreground hover:text-foreground'}`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <div className={`w-1 h-1 rounded-full bg-accent transition-opacity ${activeScreen === item.id ? 'opacity-100' : 'opacity-0'}`} />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Home Indicator */}
                                    <div className="h-6 bg-card/80 flex justify-center pb-2">
                                        <div className="w-32 h-1 bg-foreground/10 rounded-full" />
                                    </div>
                                </div>

                                {/* Dynamic Island Notch */}
                                <motion.div
                                    animate={{
                                        width: isIslandExpanded ? 200 : 112,
                                        height: isIslandExpanded ? 40 : 28,
                                        borderRadius: isIslandExpanded ? 20 : 24
                                    }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                    className="absolute top-2 left-1/2 -translate-x-1/2 bg-black z-50 flex items-center justify-center px-4 overflow-hidden border border-white/5"
                                >
                                    {isIslandExpanded ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center gap-3 w-full"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                            </div>
                                            <span className="text-[10px] font-bold text-white truncate">Vehicle Connection Active</span>
                                        </motion.div>
                                    ) : (
                                        <>
                                            <div className="w-1 h-1 rounded-full bg-blue-500/40 mr-auto" />
                                            <div className="w-8 h-1.5 bg-white/10 rounded-full" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 ml-auto" />
                                        </>
                                    )}
                                </motion.div>
                            </div>

                            {/* Side Buttons Visual Details */}
                            <div className="absolute top-[120px] -left-3 w-1.5 h-12 bg-[#222] rounded-l-md" />
                            <div className="absolute top-[180px] -left-3 w-1.5 h-16 bg-[#222] rounded-l-md" />
                            <div className="absolute top-[180px] -right-3 w-1.5 h-20 bg-[#222] rounded-r-md" />

                            {/* Hotspots for specific Mobile features */}
                            <div className="absolute top-1/2 -right-16 translate-x-1/2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                                <div className="w-12 h-12 rounded-2xl glass-card elite-glass flex items-center justify-center border-accent/30 shadow-huge">
                                    <Download className="w-5 h-5 text-accent" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl glass-card elite-glass flex items-center justify-center border-accent/30 shadow-huge">
                                    <ShieldCheck className="w-5 h-5 text-accent" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Reset Rotation Floating Action */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={resetRotation}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card px-4 py-2 rounded-full border-accent/20 text-[8px] font-black uppercase tracking-tighter text-muted-foreground hover:text-accent transition-colors z-30"
                        >
                            Reset View
                        </motion.button>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-8">
                            <Smartphone className="w-4 h-4 text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">The 360° Experience</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                            Your Elite Fleet, <br />
                            <span className="text-gradient">Fully Mobile</span>.
                        </h2>

                        <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">
                            Pick up the future. Interact with our virtual device to explore the upcoming
                            CityCars ecosystem—from AI-driven choices to immersive 360° inspections.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                            <MagneticButton>
                                <Button className="w-full h-20 rounded-2xl bg-[#090909] text-white border border-white/5 hover:border-accent/30 flex items-center justify-start gap-4 px-6 group transition-all">
                                    <Apple className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase opacity-50 tracking-tighter">Available soon on</p>
                                        <p className="text-xl font-bold">App Store</p>
                                    </div>
                                </Button>
                            </MagneticButton>

                            <MagneticButton>
                                <Button className="w-full h-20 rounded-2xl bg-[#090909] text-white border border-white/5 hover:border-accent/30 flex items-center justify-start gap-4 px-6 group transition-all">
                                    <PlayCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase opacity-50 tracking-tighter">Coming soon to</p>
                                        <p className="text-xl font-bold">Google Play</p>
                                    </div>
                                </Button>
                            </MagneticButton>
                        </div>

                        {/* Coming Soon Reservation Status */}
                        <div className="pt-12 border-t border-border/50">
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-accent/20 flex items-center justify-center overflow-hidden">
                                            <div className="w-full h-full bg-gradient-to-br from-accent to-black opacity-30" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-foreground">Mobile Launch Program</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                        <p className="text-xs text-accent font-black uppercase tracking-[0.2em]">Coming Soon • Q4 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;
