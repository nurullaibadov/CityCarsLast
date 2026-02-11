import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Car, UserCheck, Plane, Gift, MapPin, Calendar, ArrowRight } from 'lucide-react';
import MouseTilt from '@/components/ui/mouse-tilt';

const services = [
    {
        id: 'chauffeur',
        icon: <UserCheck className="w-8 h-8" />,
        title: "Personal Chauffeur",
        description: "Professional multi-lingual drivers available for your business or tourist needs."
    },
    {
        id: 'airport',
        icon: <Plane className="w-8 h-8" />,
        title: "Airport VIP Transfer",
        description: "Meet & Greet service at Heydar Aliyev International Airport with luggage assistance."
    },
    {
        id: 'events',
        icon: <Gift className="w-8 h-8" />,
        title: "Event Delivery",
        description: "Special vehicle preparation for weddings, conferences, or surprise gift delivery."
    }
];

const LuxuryConcierge: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-muted/20 relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-6"
                    >
                        <Gift className="w-4 h-4 text-accent" />
                        <span className="text-xs font-bold uppercase tracking-widest text-accent">Beyond Car Rental</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl leading-tight">
                        Our Luxury <span className="text-gradient">Concierge</span> Services
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        We dont just provide cars; we provide experiences. Our concierge team is
                        dedicated to making your journey through Azerbaijan flawless.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <MouseTilt key={index} intensity={10}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="glass-card p-10 rounded-[3rem] border-border/50 group h-full flex flex-col items-center text-center hover:border-accent/40 transition-all duration-500 holographic-shine"
                            >
                                <div className="w-20 h-20 rounded-3xl accent-gradient flex items-center justify-center text-accent-foreground mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed flex-1">
                                    {service.description}
                                </p>
                                <div className="mt-8 pt-8 border-t border-border/30 w-full flex justify-center">
                                    <button
                                        onClick={() => navigate(`/services/${service.id}`)}
                                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
                                    >
                                        Details <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        </MouseTilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LuxuryConcierge;
