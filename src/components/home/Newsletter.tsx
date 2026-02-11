import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            toast({
                title: 'Invalid Email',
                description: 'Please enter a valid email address.',
                variant: 'destructive'
            });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast({
                title: 'Success! 🎉',
                description: 'You\'ve been subscribed to our newsletter.',
            });
            setEmail('');
            setIsLoading(false);
        }, 1000);
    };

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/20 rounded-full opacity-20 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/10 rounded-full opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="relative overflow-hidden rounded-[3rem] p-8 md:p-20 text-center glass-card border-accent/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group hover-glow">
                        {/* Background Gradient Shine */}
                        <div className="absolute inset-0 premium-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0.8 }}
                                whileInView={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] accent-gradient mb-10 shadow-huge"
                            >
                                <Mail className="w-10 h-10 text-accent-foreground" />
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
                                Get Exclusive <span className="text-gradient">Offers</span>.
                            </h2>
                            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                                Join our inner circle and receive first-hand access to premium fleet updates,
                                exclusive seasonal discounts, and luxury travel insights.
                            </p>

                            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                                <div className="flex flex-col sm:flex-row gap-4 p-2 rounded-[2rem] glass-card border-border/50 shadow-inner group-focus-within:border-accent group-focus-within:ring-2 group-focus-within:ring-accent/20 transition-all">
                                    <div className="flex-1 relative">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="Enter your premium email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-16 pl-16 bg-transparent border-none text-lg placeholder:text-muted-foreground/50 focus-visible:ring-0"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="h-16 px-10 rounded-2xl accent-gradient text-accent-foreground font-bold premium-glow hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 border-3 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                                                Joining...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <span>Subscribe Now</span>
                                                <Send className="w-5 h-5" />
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </form>

                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                    <CheckCircle2 className="w-5 h-5 text-accent" />
                                    <span>Weekly Curated News</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                    <Star className="w-5 h-5 text-accent" />
                                    <span>Premium Access Only</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
                                    <CheckCircle2 className="w-5 h-5 text-accent" />
                                    <span>Unsubscribe Anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
