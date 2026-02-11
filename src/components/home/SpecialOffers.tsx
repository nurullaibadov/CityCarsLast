import React, { useState, useEffect } from 'react';
import { Percent, Clock, Gift, Zap, Sparkles, Timer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface Offer {
    id: number;
    title: string;
    description: string;
    discount: string;
    icon: React.ReactNode;
    validUntil: Date;
    badge: string;
    gradient: string;
}

const offers: Offer[] = [
    {
        id: 1,
        title: 'Weekend Elite',
        description: 'Command the roads for 2 days, and receive the 3rd day as our compliment.',
        discount: '33% OFF',
        icon: <Gift className="w-8 h-8" />,
        validUntil: new Date('2026-02-01'),
        badge: 'Exclusive',
        gradient: 'from-[#FFD700] to-[#FFA500]'
    },
    {
        id: 2,
        title: 'Advance Reserve',
        description: 'Secure your prestige vehicle 7 days early for significant advantages.',
        discount: '20% OFF',
        icon: <Clock className="w-8 h-8" />,
        validUntil: new Date('2026-02-15'),
        badge: 'Priority',
        gradient: 'from-[#FFD700] to-[#FFA500]'
    },
    {
        id: 3,
        title: 'Extended Tenure',
        description: 'For those who stay longer, we offer unmatched monthly arrangements.',
        discount: '40% OFF',
        icon: <Percent className="w-8 h-8" />,
        validUntil: new Date('2026-03-01'),
        badge: 'Premier',
        gradient: 'from-[#FFD700] to-[#FFA500]'
    },
    {
        id: 4,
        title: 'Inaugural Journey',
        description: 'A special welcome for our new members. Start your legacy today.',
        discount: '15% OFF',
        icon: <Zap className="w-8 h-8" />,
        validUntil: new Date('2026-01-31'),
        badge: 'Welcome',
        gradient: 'from-[#FFD700] to-[#FFA500]'
    }
];

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-3 justify-center">
            {[
                { label: 'D', value: timeLeft.days },
                { label: 'H', value: timeLeft.hours },
                { label: 'M', value: timeLeft.minutes },
                { label: 'S', value: timeLeft.seconds },
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg glass-card border-accent/20 flex items-center justify-center font-bold text-sm text-foreground shadow-inner">
                        {item.value}
                    </div>
                </div>
            ))}
        </div>
    );
};

const SpecialOffers: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleClaimOffer = (offer: Offer) => {
        toast({
            title: 'Offer Secured! 🏆',
            description: `${offer.title} benefits applied. Preparing your journey...`,
        });

        setTimeout(() => {
            navigate('/booking'); // Redirect to booking instead of pricing
        }, 1200);
    };

    return (
        <section className="py-32 relative bg-background overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8">
                            Curated <span className="text-gradient">Privileges</span>.
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Experience the pinnacle of luxury with our hand-selected opportunities,
                            designed for those who appreciate the finer things in life.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="h-full group relative overflow-hidden glass-card border-accent/10 hover:border-accent/40 shadow-huge transition-all duration-500 hover:-translate-y-2">
                                {/* Top Banner */}
                                <div className="absolute top-0 left-0 right-0 h-1 accent-gradient" />

                                <CardContent className="p-8 relative">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                            <div className="text-accent-foreground">
                                                {offer.icon}
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-[0.2em] border-accent/30 text-accent">
                                            {offer.badge}
                                        </Badge>
                                    </div>

                                    <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                                        {offer.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed h-12 overflow-hidden">
                                        {offer.description}
                                    </p>

                                    <div className="flex items-end gap-2 mb-10">
                                        <span className="text-4xl font-display font-bold text-gradient">{offer.discount}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Benefit</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                            <Timer className="w-3 h-3 text-accent" />
                                            Validity
                                        </div>
                                        <CountdownTimer targetDate={offer.validUntil} />
                                    </div>

                                    <Button
                                        onClick={() => handleClaimOffer(offer)}
                                        className="w-full h-14 rounded-2xl accent-gradient text-accent-foreground font-bold uppercase tracking-widest text-xs premium-glow"
                                    >
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Secure Privilege
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SpecialOffers;
