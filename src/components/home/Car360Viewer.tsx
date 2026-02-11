import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { RotateCcw, Maximize2, Info, ChevronLeft, ChevronRight, MousePointer2, Fingerprint, ZapOff, Key, Eye, Box, Activity } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-car.jpg';

const Car360Viewer: React.FC = () => {
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
    const [isEngineRunning, setIsEngineRunning] = useState(false);
    const [isIgniting, setIsIgniting] = useState(false);
    const [isInteriorView, setIsInteriorView] = useState(false);
    const [isXrayEnabled, setIsXrayEnabled] = useState(false);
    const { toast } = useToast();

    // Parallax & Rotation control
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-300, 300], [10, -10]), { damping: 20 });
    const rotateY = useSpring(useTransform(x, [-300, 300], [-30, 30]), { damping: 20 });

    // Hotspots data
    const exteriorHotspots = [
        { id: 'engine', x: '25%', y: '40%', title: 'V12 Performance', desc: '750HP Twin-Turbo' },
        { id: 'wheels', x: '70%', y: '65%', title: 'Forged Alloys', desc: '22" Diamond Cut' },
        { id: 'aero', x: '80%', y: '35%', title: 'Active Aero', desc: 'Adaptive Carbon Spoiler' },
    ];

    const interiorHotspots = [
        { id: 'cockpit', x: '50%', y: '50%', title: 'Glass Cockpit', desc: 'Dual 12" OLED Displays' },
        { id: 'seats', x: '30%', y: '60%', title: 'Ergo-Comfort', desc: 'Nappa Leather & Massage' },
    ];

    const currentHotspots = isInteriorView ? interiorHotspots : exteriorHotspots;

    useEffect(() => {
        if (isAutoRotating && !isIgniting) {
            const timer = setInterval(() => {
                const time = Date.now() / 2000;
                x.set(Math.sin(time) * 100);
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isAutoRotating, x, isIgniting]);

    const handleDrag = (_: any, info: any) => {
        setIsAutoRotating(false);
        x.set(x.get() + info.delta.x);
        y.set(y.get() + info.delta.y);
    };

    const toggleEngine = () => {
        if (!isEngineRunning) {
            setIsIgniting(true);
            toast({
                title: "Security Verified",
                description: "Initializing ignition sequence...",
            });

            // Delay actual engine start until key animation finishes
            setTimeout(() => {
                setIsIgniting(false);
                setIsEngineRunning(true);
                toast({
                    title: "Engine Active",
                    description: "V12 Powertrain is now online. Performance mode enabled.",
                });
            }, 1500);
        } else {
            setIsEngineRunning(false);
            toast({
                title: "Engine Standby",
                description: "Vehicle systems returning to dormant state.",
            });
        }
    };

    return (
        <section className="py-24 relative bg-background overflow-hidden min-h-[800px] flex items-center">
            {/* Background Text Decor */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[30vw] font-display font-black">CITYCARS</span>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* 360 Viewer Canvas */}
                    <div className="w-full lg:w-2/3 relative aspect-video group cursor-grab active:cursor-grabbing">

                        {/* Immersive Backdrop */}
                        <div className={`absolute inset-0 bg-gradient-to-b ${isEngineRunning ? 'from-accent/20' : 'from-accent/5'} to-transparent rounded-[3rem] blur-3xl opacity-50 transition-colors duration-1000`} />

                        {/* Cinematic Key Overlay during Ignition */}
                        <AnimatePresence>
                            {isIgniting && (
                                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                                    <div className="relative">
                                        <div className="ignition-ripple w-40 h-40" />
                                        <div className="ignition-ripple w-40 h-40 [animation-delay:0.2s]" />
                                        <div className="key-ignition-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card elite-glass p-8 rounded-[2.5rem] border-accent/30 shadow-[0_0_50px_rgba(var(--accent-rgb),0.3)]">
                                            <Key className="w-12 h-12 text-accent" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            style={{ rotateX, rotateY, perspective: 1000 }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            onDrag={handleDrag}
                            className={`relative w-full h-full preserve-3d transition-transform duration-500 ${isEngineRunning ? 'engine-vibration' : ''}`}
                        >
                            {/* Main Car Image with Parallax & Reflection effect */}
                            <motion.div className="w-full h-full relative">
                                <motion.img
                                    animate={{
                                        scale: isInteriorView ? 1.5 : 1,
                                        filter: isXrayEnabled ? 'contrast(1.5) brightness(0.8) sepia(0.5) hue-rotate(180deg)' : 'none'
                                    }}
                                    src={heroImage}
                                    alt="360 View"
                                    className={`w-full h-full object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)] cursor-default select-none transition-all duration-700 ${isEngineRunning ? 'headlight-glow brightness-110' : ''}`}
                                />

                                {/* Active Aero: Spoiler Animation */}
                                {!isInteriorView && (
                                    <motion.div
                                        animate={{
                                            y: isEngineRunning ? -15 : 0,
                                            rotateX: isEngineRunning ? -5 : 0,
                                            opacity: isXrayEnabled ? 0.2 : 1
                                        }}
                                        className="absolute right-[15%] top-[30%] w-32 h-4 bg-foreground/10 backdrop-blur-md border border-white/5 rounded-full z-10"
                                    />
                                )}

                                {/* X-Ray Technical Overlay */}
                                <AnimatePresence>
                                    {isXrayEnabled && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.4 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]"
                                        >
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                            <div className="w-full h-full border-[2px] border-accent/30 rounded-[3rem] animate-pulse" />
                                            {/* SVG Technical Lines would go here, using CSS for now */}
                                            <div className="absolute top-[40%] left-[20%] w-[40%] h-[2px] bg-accent/50 rotate-[-15deg]" />
                                            <div className="absolute top-[60%] right-[30%] w-[30%] h-[2px] bg-accent/50 rotate-[25deg]" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Light Overlays (Visual Markers for Glow) */}
                                <AnimatePresence>
                                    {isEngineRunning && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 0.6, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                className="absolute top-[55%] left-[15%] w-32 h-32 bg-accent/30 rounded-full blur-[40px] pointer-events-none"
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 0.4, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                className="absolute top-[45%] right-[20%] w-24 h-24 bg-accent/20 rounded-full blur-[30px] pointer-events-none"
                                            />
                                        </>
                                    )}
                                </AnimatePresence>

                                {/* Ground Reflection */}
                                <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-12 ${isEngineRunning ? 'bg-accent/20' : 'bg-black/40'} blur-2xl rounded-full scale-y-50 transition-colors duration-700`} />
                            </motion.div>

                            {/* Hotspots */}
                            {currentHotspots.map((spot) => (
                                <motion.div
                                    key={spot.id}
                                    className="absolute z-20"
                                    style={{ left: spot.x, top: spot.y }}
                                >
                                    <button
                                        onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                                        className="relative group/hotspot"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-accent/20 backdrop-blur-md border border-accent/50 flex items-center justify-center animate-pulse">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                        </div>

                                        {activeHotspot === spot.id && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 glass-card elite-glass p-4 rounded-2xl border-accent/20 z-30"
                                            >
                                                <p className="font-display font-bold text-sm text-foreground">{spot.title}</p>
                                                <p className="text-xs text-muted-foreground">{spot.desc}</p>
                                            </motion.div>
                                        )}
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 glass-card elite-glass px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { x.set(0); y.set(0); setIsAutoRotating(true); }} className="hover:text-accent transition-colors">
                                <RotateCcw className="w-5 h-5" />
                            </button>
                            <div className="h-4 w-px bg-border/50" />

                            {/* Start Engine Trigger */}
                            <button
                                onClick={toggleEngine}
                                disabled={isIgniting}
                                className={`flex items-center gap-2 group/engine transition-all duration-500 ${isEngineRunning ? 'text-accent' : 'text-muted-foreground hover:text-foreground'} ${isIgniting ? 'opacity-50' : ''}`}
                            >
                                {isEngineRunning ? (
                                    <ZapOff className="w-5 h-5 animate-pulse" />
                                ) : (
                                    <Fingerprint className="w-5 h-5 group-hover/engine:scale-110 transition-transform" />
                                )}
                                <span className="text-xs font-bold uppercase tracking-widest">
                                    {isIgniting ? 'Igniting...' : (isEngineRunning ? 'Stop Engine' : 'Start Engine')}
                                </span>
                            </button>

                            <div className="h-4 w-px bg-border/50" />

                            {/* View Toggle */}
                            <button
                                onClick={() => setIsInteriorView(!isInteriorView)}
                                className={`flex items-center gap-2 transition-all duration-300 ${isInteriorView ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <Eye className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{isInteriorView ? 'Exterior' : 'Interior'}</span>
                            </button>

                            <div className="h-4 w-px bg-border/50" />

                            {/* X-Ray Toggle */}
                            <button
                                onClick={() => setIsXrayEnabled(!isXrayEnabled)}
                                className={`flex items-center gap-2 transition-all duration-300 ${isXrayEnabled ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <Activity className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">X-Ray</span>
                            </button>

                            <div className="h-4 w-px bg-border/50" />
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                <MousePointer2 className="w-4 h-4" />
                                Explore
                            </div>
                        </div>
                    </div>

                    {/* Content Component */}
                    <div className="w-full lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-accent font-bold uppercase tracking-tighter text-sm mb-4 block">Interactive Experience</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
                                Precision from <span className="text-gradient">Every Angle</span>.
                            </h2>
                            <p className="text-muted-foreground mb-12 leading-relaxed">
                                Our virtual showroom allows you to inspect every nuance of our elite fleet.
                                Interact with hotspots to learn about the bespoke engineering behind each masterpiece.
                            </p>

                            <div className="space-y-6">
                                {[
                                    { label: "High Definition Textures", icon: Maximize2 },
                                    { label: "Real-time Lighting", icon: Info },
                                    { label: "Engineering Detail", icon: RotateCcw }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-xl glass-card border-border/50 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Car360Viewer;
