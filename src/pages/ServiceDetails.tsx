import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    UserCheck,
    Plane,
    Gift,
    ArrowLeft,
    CheckCircle2,
    Calendar,
    ShieldCheck,
    Clock,
    Sparkles,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/ui/magnetic-button';
import { useToast } from '@/hooks/use-toast';

const serviceData: Record<string, any> = {
    'chauffeur': {
        title: "Personal Chauffeur",
        icon: <UserCheck className="w-12 h-12" />,
        heroImage: "https://images.unsplash.com/photo-1511520660692-069176394336?auto=format&fit=crop&q=80",
        description: "Experience the ultimate in mobility with our professional multi-lingual chauffeurs. Whether for high-stakes business meetings or curated tours of Azerbaijan, our drivers ensure your safety and comfort.",
        features: [
            "Professional Multi-lingual Drivers (English, Russian, Turkish, Azeri)",
            "Punctuality Guaranteed",
            "Confidentiality & Privacy Protocol",
            "Daily or Hourly Rates Available",
            "Luxurious Fleet of S-Class & V-Class Vehicles"
        ],
        pricing: "Starting from $150 / day"
    },
    'airport': {
        title: "Airport VIP Transfer",
        icon: <Plane className="w-12 h-12" />,
        heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80",
        description: "Your journey begins the moment you touch down. Our Meet & Greet service at Heydar Aliyev International Airport provides a seamless transition from the terminal to your destination with absolute VIP treatment.",
        features: [
            "Name Card Meet & Greet in Arrival Hall",
            "Luggage Assistance & Porter Service",
            "Real-time Flight Tracking for Delays",
            "Refreshing Towels & Water On-board",
            "Fast-track Protocol available"
        ],
        pricing: "Starting from $80 / transfer"
    },
    'events': {
        title: "Event & Wedding Delivery",
        icon: <Gift className="w-12 h-12" />,
        heroImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
        description: "Make your special day unforgettable with our bespoke vehicle preparation. From luxury wedding cavalcades to corporate conference transport, we deliver elegance right to your event's doorstep.",
        features: [
            "Floral & Ribbon Decoration Services",
            "Special 'Gift' Delivery Protocols",
            "Coordinated Multi-car Caravans",
            "Branded Corporate Fleet Options",
            "Photogenic 'Hero' Car Preparation"
        ],
        pricing: "Custom Quote Required"
    }
};

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();

    const service = id ? serviceData[id] : null;

    if (!service) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-display font-bold mb-4">Service Not Found</h1>
                        <Button onClick={() => navigate('/')}>Return Home</Button>
                    </div>
                </div>
            </Layout>
        );
    }

    const handleBooking = () => {
        toast({
            title: "Booking Initiated",
            description: `Our concierge team is preparing your ${service.title} plan. We will contact you shortly.`,
        });
    };

    return (
        <Layout>
            <div className="min-h-screen bg-background relative overflow-hidden">
                {/* Cinematic Backdrop */}
                <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full relative"
                    >
                        <img src={service.heroImage} alt={service.title} className="w-full h-full object-cover opacity-40 cinema-mask" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    </motion.div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="mb-12 group hover:text-accent transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Concierge
                    </Button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Content */}
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="w-20 h-20 rounded-3xl accent-gradient flex items-center justify-center text-accent-foreground mb-8 shadow-2xl holographic-shine">
                                {service.icon}
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-black text-foreground mb-6 leading-tight">
                                {service.title.split(' ').map((word: string, i: number) => (
                                    <span key={i} className={i === service.title.split(' ').length - 1 ? "text-gradient" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                                {service.description}
                            </p>

                            <div className="space-y-6 mb-12">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Premium Inclusion
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {service.features.map((feature: string, i: number) => (
                                        <div key={i} className="flex items-center gap-3 group">
                                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                            <span className="text-foreground font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center mb-12">
                                <div className="glass-card elite-glass px-6 py-4 rounded-2xl flex items-center gap-4">
                                    <Clock className="w-5 h-5 text-accent" />
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Availability</div>
                                        <div className="font-bold">24/7 Priority</div>
                                    </div>
                                </div>
                                <div className="glass-card elite-glass px-6 py-4 rounded-2xl flex items-center gap-4">
                                    <ShieldCheck className="w-5 h-5 text-accent" />
                                    <div>
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Security</div>
                                        <div className="font-bold">Elite Protocol</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Dynamic Booking Card */}
                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="sticky top-32"
                        >
                            <div className="glass-card elite-glass p-10 rounded-[3rem] border-white/10 shadow-huge relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                                    {service.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-2">Request This Service</h3>
                                <p className="text-muted-foreground text-sm mb-10">Tailor your bespoke experience with our specialists.</p>

                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium">Pricing Tier</span>
                                        <span className="text-foreground font-black tracking-wider text-xl">{service.pricing}</span>
                                    </div>
                                    <div className="h-px bg-white/10 w-full" />
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium">Bespoke Options</span>
                                        <span className="text-accent font-bold">Included</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium">Concierge Support</span>
                                        <span className="text-accent font-bold">Level Gold</span>
                                    </div>
                                </div>

                                <MagneticButton className="w-full">
                                    <Button
                                        onClick={handleBooking}
                                        className="w-full h-16 accent-gradient text-accent-foreground text-lg font-black rounded-2xl premium-glow flex items-center justify-center gap-3"
                                    >
                                        Confirm & Plan Journey <ChevronRight className="w-5 h-5" />
                                    </Button>
                                </MagneticButton>

                                <div className="mt-8 flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4 text-accent" />
                                        Instant Scheduling
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare className="w-4 h-4 text-accent" />
                                        Live Chat Active
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 text-center text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-black opacity-50">
                                Official CityCars Platinum Elite Partner
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ServiceDetails;
