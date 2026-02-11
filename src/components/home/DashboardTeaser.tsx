import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Wallet, History, MapPin, Star, Settings, LogOut, ChevronRight, Zap } from 'lucide-react';
import MouseTilt from '@/components/ui/mouse-tilt';

const DashboardTeaser: React.FC = () => {
    return (
        <section className="py-24 bg-background relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-20 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-2/5 space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-4">
                            <LayoutDashboard className="w-4 h-4 text-accent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-accent">Personal Dashboard</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                            Manage Your <br />
                            <span className="text-gradient">Rentals Instantly</span>
                        </h2>

                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Our state-of-the-art dashboard gives you total control. Track your delivery,
                            view historical bookings, and manage your premium loyalty points
                            all in one place.
                        </p>

                        <div className="space-y-4 pt-4">
                            {[
                                { title: "Real-time Tracking", desc: "Live GPS location of your delivery." },
                                { title: "One-Click Booking", desc: "Reserved your favorite car in seconds." },
                                { title: "Point Accumulation", desc: "Earn rewards on every kilometer." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                                        <ChevronRight className="w-4 h-4 text-accent" />
                                    </div>
                                    <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-3/5"
                    >
                        <MouseTilt intensity={5}>
                            <div className="relative glass-card p-2 rounded-[3rem] border-accent/20 shadow-huge overflow-hidden">
                                {/* Mockup UI Sidebar */}
                                <div className="flex bg-background/40 backdrop-blur-3xl min-h-[500px] rounded-[2.5rem] overflow-hidden">
                                    <div className="w-20 md:w-64 bg-muted/30 border-r border-border/50 p-6 flex flex-col items-center md:items-start gap-10">
                                        <div className="w-10 h-10 md:w-full md:h-12 rounded-xl accent-gradient flex items-center justify-center">
                                            <span className="hidden md:inline font-bold text-accent-foreground tracking-tighter">CITYCARS</span>
                                            <LayoutDashboard className="md:hidden w-5 h-5 text-accent-foreground" />
                                        </div>

                                        <div className="flex-1 space-y-6 w-full">
                                            {[
                                                { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
                                                { icon: <Wallet size={20} />, label: "Payments" },
                                                { icon: <History size={20} />, label: "Bookings" },
                                                { icon: <MapPin size={20} />, label: "Tracking" },
                                                { icon: <Star size={20} />, label: "Loyalty" }
                                            ].map((link, i) => (
                                                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${link.active ? 'bg-accent/10 text-accent' : 'text-muted-foreground hover:bg-muted'}`}>
                                                    {link.icon}
                                                    <span className="hidden md:inline text-sm font-bold">{link.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="text-muted-foreground hover:text-destructive cursor-pointer flex items-center gap-4 p-3 mb-4">
                                            <LogOut size={20} />
                                            <span className="hidden md:inline text-sm font-bold">Logout</span>
                                        </div>
                                    </div>

                                    {/* Mockup UI Content */}
                                    <div className="flex-1 p-8 md:p-12 space-y-10">
                                        <div className="flex justify-between items-end">
                                            <div className="space-y-2">
                                                <h4 className="text-3xl font-bold">Welcome back, Murad!</h4>
                                                <p className="text-muted-foreground">You have 2 active bookings for today.</p>
                                            </div>
                                            <div className="hidden md:flex items-center gap-4 p-4 glass-card rounded-2xl border-accent/20 bg-accent/5">
                                                <Star className="text-accent fill-accent" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wider opacity-60">Elite Points</p>
                                                    <p className="text-xl font-bold">12,450</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="card-gradient rounded-3xl p-6 border-accent/20 bg-accent/5 space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <p className="text-sm font-bold opacity-60">Current Reservation</p>
                                                    <Zap className="text-accent" size={20} />
                                                </div>
                                                <p className="text-2xl font-bold">BMW M4 Competition</p>
                                                <p className="text-xs font-medium text-accent">Delivery in progress · 15 mins away</p>
                                            </div>
                                            <div className="glass-card rounded-3xl p-6 border-border/50 bg-muted/20 space-y-4">
                                                <p className="text-sm font-bold opacity-60">Fleet Statistics</p>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <div key={i} className="flex-1 h-3 rounded-full bg-accent/20 overflow-hidden">
                                                            <div className="h-full bg-accent" style={{ width: `${Math.random() * 100}%` }} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MouseTilt>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default DashboardTeaser;
