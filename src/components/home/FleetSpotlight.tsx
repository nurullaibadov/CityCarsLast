import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import MouseTilt from '@/components/ui/mouse-tilt';

const categories = [
    {
        id: 'premium',
        name: 'Premium SUV',
        description: 'Ultimate comfort and presence for your Baku journey.',
        cars: ['Range Rover Sport', 'Porsche Cayenne', 'Mercedes G63'],
        features: ['Chauffeur Available', '4x4 All-Terrain', 'Nappa Leather'],
        color: 'from-red-600 to-black',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'sport',
        name: 'Sport Series',
        description: 'Feel the adrenaline on the Baku City Circuit roads.',
        cars: ['BMW M4 Competition', 'Audi RS6', 'Porsche 911'],
        features: ['500+ Horsepower', 'Launch Control', 'Sport Exhaust'],
        color: 'from-orange-600 to-red-900',
        image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7fd761?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'vip',
        name: 'VIP Business',
        description: 'Discreet luxury for high-profile client meetings.',
        cars: ['Mercedes S-Class', 'Rolls-Royce Ghost', 'Bentley Flying Spur'],
        features: ['Privacy Glass', 'Massage Seats', 'Wi-Fi Hotspot'],
        color: 'from-gray-800 to-black',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    }
];

const FleetSpotlight: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left Side: Content */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-6">
                                <Sparkles className="w-4 h-4 text-accent" />
                                <span className="text-xs font-bold uppercase tracking-widest text-accent">Fleet Selection</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                Choose Your <span className="text-gradient">Style</span>
                            </h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Explore our curated collections of the worlds most desirable vehicles,
                                maintained to the highest standards of excellence.
                            </p>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap gap-4">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-4 rounded-2xl font-bold transition-all duration-500 ${activeCategory.id === cat.id
                                        ? 'accent-gradient text-accent-foreground shadow-huge scale-105'
                                        : 'glass-card border-border/50 hover:border-accent/30'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Active Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">{activeCategory.description}</h3>
                                    <div className="flex gap-2 flex-wrap">
                                        {activeCategory.cars.map(car => (
                                            <span key={car} className="text-sm font-medium text-accent">· {car}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activeCategory.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
                                            <Shield className="w-5 h-5 text-accent" />
                                            <span className="text-sm font-semibold">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={() => navigate('/cars')}
                                    className="h-14 px-8 rounded-xl bg-foreground text-background hover:bg-foreground/90 group"
                                >
                                    Explore Full Collection <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Visual */}
                    <div className="w-full lg:w-1/2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory.id}
                                initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                <MouseTilt>
                                    <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-border shadow-huge holographic-shine">
                                        <img
                                            src={activeCategory.image}
                                            alt={activeCategory.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${activeCategory.color} opacity-30 mix-blend-multiply`} />

                                        <div className="absolute bottom-10 left-10 p-8 glass-card rounded-3xl border-white/20">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/70 mb-1">Starting from</p>
                                            <p className="text-3xl font-bold text-white tracking-widest">$299<span className="text-sm font-normal">/day</span></p>
                                        </div>
                                    </div>
                                </MouseTilt>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FleetSpotlight;
