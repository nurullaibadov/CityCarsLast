import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Check, Car, User, MapPin, Briefcase, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';

const AIConcierge: React.FC = () => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<Record<string, any>>({});
    const [isThinking, setIsThinking] = useState(false);
    const [recommendation, setRecommendation] = useState<any>(null);

    const steps = [
        {
            id: 'lifestyle',
            question: "What's the primary purpose of your journey?",
            options: [
                { id: 'business', label: 'Business Executive', icon: Briefcase, desc: 'Sophistication and comfort' },
                { id: 'leisure', label: 'Special Occasion', icon: Sparkles, desc: 'Make an unforgettable entrance' },
                { id: 'thrill', label: 'Pure Thrill', icon: Zap, desc: 'Performance-driven adrenaline' },
            ]
        },
        {
            id: 'terrain',
            question: "Where are you heading?",
            options: [
                { id: 'city', label: 'City Centers', icon: MapPin, desc: 'Agile luxury for the streets' },
                { id: 'country', label: 'Coastal / Mountains', icon: User, desc: 'Powerful all-terrain mastery' },
            ]
        }
    ];

    const handleSelect = (id: string) => {
        const updated = { ...selections, [steps[step].id]: id };
        setSelections(updated);

        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            setIsThinking(true);
            setTimeout(() => {
                setIsThinking(false);
                setRecommendation({
                    name: updated.lifestyle === 'thrill' ? 'Ferrari F8 Tributo' : 'Mercedes S-Class',
                    image: '/path-to-car',
                    price: updated.lifestyle === 'thrill' ? '$1,200/day' : '$600/day',
                    desc: 'Based on your preference for ' + updated.lifestyle + ' in ' + updated.terrain + '.'
                });
            }, 2000);
        }
    };

    return (
        <section className="py-32 relative bg-background/50 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[200px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-8">
                                    <Sparkles className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">AI Lifestyle Concierge</span>
                                </div>
                                <h2 className="text-5xl font-display font-bold text-foreground mb-8">
                                    Let AI Find Your <span className="text-gradient">Perfect Match</span>.
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                                    Our advanced recommendation engine analyzes your preferences to suggest the vehicle that best complements your identity and journey.
                                </p>
                            </motion.div>
                        </div>

                        <div className="w-full md:w-1/2 relative min-h-[500px]">
                            <AnimatePresence mode="wait">
                                {!recommendation && !isThinking && (
                                    <motion.div
                                        key="quiz"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="glass-card elite-glass p-8 rounded-[2.5rem] border-white/10 shadow-2xl relative"
                                    >
                                        <div className="mb-8">
                                            <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                                                <span>Step {step + 1} of {steps.length}</span>
                                                <div className="flex gap-1">
                                                    {steps.map((_, i) => (
                                                        <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? 'bg-accent' : 'bg-white/10'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-display font-bold text-foreground">{steps[step].question}</h3>
                                        </div>

                                        <div className="space-y-4">
                                            {steps[step].options.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => handleSelect(opt.id)}
                                                    className="w-full group flex items-center justify-between p-6 rounded-2xl glass-card border-white/5 hover:border-accent/40 hover:bg-white/5 transition-all text-left"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                                                            <opt.icon className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-foreground">{opt.label}</div>
                                                            <div className="text-xs text-muted-foreground">{opt.desc}</div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {isThinking && (
                                    <motion.div
                                        key="thinking"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col items-center justify-center p-20 glass-card elite-glass rounded-[2.5rem] text-center"
                                    >
                                        <div className="w-20 h-20 relative mb-8">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 rounded-full border-4 border-accent/20 border-t-accent"
                                            />
                                            <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-accent animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold mb-2">Analyzing Selection</h3>
                                        <p className="text-muted-foreground text-sm">Matching with our elite fleet database...</p>
                                    </motion.div>
                                )}

                                {recommendation && (
                                    <motion.div
                                        key="recommendation"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="glass-card bg-accent text-accent-foreground p-10 rounded-[2.5rem] shadow-huge text-center overflow-hidden relative"
                                    >
                                        <div className="absolute -top-10 -right-10 opacity-10">
                                            <Car className="w-64 h-64 rotate-12" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                                                <Check className="w-10 h-10" />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest mb-2 block opacity-80">Your Match Found</span>
                                            <h3 className="text-4xl font-display font-black mb-4">{recommendation.name}</h3>
                                            <p className="text-lg opacity-80 mb-8 max-w-xs mx-auto">{recommendation.desc}</p>
                                            <div className="text-3xl font-black mb-10">{recommendation.price}</div>

                                            <MagneticButton>
                                                <Button size="lg" variant="secondary" className="w-full h-16 rounded-2xl text-lg font-bold">
                                                    Confirm Reservation
                                                </Button>
                                            </MagneticButton>

                                            <button
                                                onClick={() => { setRecommendation(null); setStep(0); setSelections({}); }}
                                                className="mt-6 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
                                            >
                                                Start Over
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AIConcierge;
