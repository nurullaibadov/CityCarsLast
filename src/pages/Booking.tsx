import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Calendar, MapPin, User, Mail, Phone, CreditCard,
    Check, ChevronRight, ChevronLeft, Shield, Clock,
    Car, Users, Fuel, Settings, Star, Plus, Minus, Sparkles,
    ShieldCheck, Lock, CreditCard as CardIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingData {
    // Car Details
    carId?: number;
    carName?: string;
    carPrice?: number;

    // Dates
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;

    // Location
    pickupLocation: string;
    returnLocation: string;

    // Personal Info
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    // Add-ons
    insurance: 'basic' | 'standard' | 'premium';
    gps: boolean;
    childSeat: boolean;
    additionalDriver: boolean;

    // Payment
    paymentMethod: 'card' | 'cash';
}

const Booking: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState<BookingData>({
        carId: location.state?.carId,
        carName: location.state?.carName || 'BMW 5 Series',
        carPrice: location.state?.carPrice || 120,
        pickupDate: '',
        pickupTime: '',
        returnDate: '',
        returnTime: '',
        pickupLocation: 'Baku International Airport',
        returnLocation: 'Baku International Airport',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        insurance: 'basic',
        gps: false,
        childSeat: false,
        additionalDriver: false,
        paymentMethod: 'card',
    });

    const steps = [
        { number: 1, title: 'Journey', icon: Calendar },
        { number: 2, title: 'Profile', icon: User },
        { number: 3, title: 'Privileges', icon: Shield },
        { number: 4, title: 'Settlement', icon: CreditCard },
    ];

    const insuranceOptions = [
        {
            type: 'basic' as const,
            name: 'Essential Protection',
            price: 15,
            coverage: 'Third-party liability',
            features: ['Standard coverage', 'Third-party liability', 'Phone support']
        },
        {
            type: 'standard' as const,
            name: 'Prestige Coverage',
            price: 25,
            coverage: 'Collision + Theft',
            features: ['Everything in Essential', 'Collision damage', 'Theft protection', 'Priority assistance']
        },
        {
            type: 'premium' as const,
            name: 'Elite Assurance',
            price: 40,
            coverage: 'Full zero-risk protocol',
            features: ['Maximum coverage', 'Zero deductible', 'Valet assistance', 'Concierge support']
        },
    ];

    const addOns = [
        { id: 'gps', name: 'Precision GPS', price: 5, icon: MapPin },
        { id: 'childSeat', name: 'Junior Suite', price: 8, icon: Users },
        { id: 'additionalDriver', name: 'Second Pilot', price: 10, icon: User },
    ];

    const calculateTotalDays = () => {
        if (!bookingData.pickupDate || !bookingData.returnDate) return 0;
        const pickup = new Date(bookingData.pickupDate);
        const returnD = new Date(bookingData.returnDate);
        const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    };

    const calculateTotal = () => {
        const days = calculateTotalDays();
        const carTotal = (bookingData.carPrice || 0) * days;
        const insurancePrice = insuranceOptions.find(opt => opt.type === bookingData.insurance)?.price || 0;
        const insuranceTotal = insurancePrice * days;

        let addOnsTotal = 0;
        if (bookingData.gps) addOnsTotal += 5 * days;
        if (bookingData.childSeat) addOnsTotal += 8 * days;
        if (bookingData.additionalDriver) addOnsTotal += 10 * days;

        return {
            carTotal,
            insuranceTotal,
            addOnsTotal,
            subtotal: carTotal + insuranceTotal + addOnsTotal,
            tax: (carTotal + insuranceTotal + addOnsTotal) * 0.18,
            total: (carTotal + insuranceTotal + addOnsTotal) * 1.18,
            days,
        };
    };

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                if (!bookingData.pickupDate || !bookingData.pickupTime ||
                    !bookingData.returnDate || !bookingData.returnTime) {
                    toast({
                        title: 'Protocol Breach',
                        description: 'Please specify your arrival and departure schedule',
                        variant: 'destructive',
                    });
                    return false;
                }
                break;
            case 2:
                if (!bookingData.firstName || !bookingData.lastName ||
                    !bookingData.email || !bookingData.phone) {
                    toast({
                        title: 'Identity Required',
                        description: 'Please complete your personal profile',
                        variant: 'destructive',
                    });
                    return false;
                }
                break;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = () => {
        if (!validateStep(currentStep)) return;

        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#000000']
        });

        toast({
            title: 'Reservation Secured! 🏆',
            description: 'Your elite journey is officially scheduled. Welcome to CityCars.',
        });

        setTimeout(() => {
            navigate('/'); // Go back to home
        }, 3000);
    };

    const updateBookingData = (field: keyof BookingData, value: any) => {
        setBookingData({ ...bookingData, [field]: value });
    };

    const totals = calculateTotal();

    return (
        <Layout>
            {/* Header Section */}
            <section className="relative pt-32 pb-16 overflow-hidden bg-background">
                <div className="absolute top-0 left-0 w-full h-full premium-gradient opacity-5 blur-[120px]" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
                            Finalize <span className="text-gradient">Arrangements</span>.
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl">
                            We are preparing your {bookingData.carName} for an unforgettable experience.
                            Complete the protocol below.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="pb-32 bg-background relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Process Execution Column */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Elite Progress Indicator */}
                            <Card className="glass-card border-accent/10 rounded-[2.5rem] overflow-hidden shadow-huge">
                                <CardContent className="p-8 md:p-12">
                                    <div className="flex items-center justify-between mb-12">
                                        {steps.map((step, index) => (
                                            <React.Fragment key={step.number}>
                                                <div className="flex flex-col items-center relative z-10">
                                                    <motion.div
                                                        animate={{
                                                            scale: currentStep === step.number ? 1.2 : 1,
                                                            borderColor: currentStep >= step.number ? 'var(--accent)' : 'var(--border)'
                                                        }}
                                                        className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${currentStep >= step.number
                                                            ? 'accent-gradient text-accent-foreground shadow-lg'
                                                            : 'bg-secondary/50 text-muted-foreground border-border/40'
                                                            }`}
                                                    >
                                                        {currentStep > step.number ? (
                                                            <Check className="w-6 h-6" />
                                                        ) : (
                                                            <step.icon className="w-6 h-6" />
                                                        )}
                                                    </motion.div>
                                                    <span className={`mt-4 font-bold text-[10px] uppercase tracking-[0.2em] transition-colors ${currentStep >= step.number ? 'text-accent' : 'text-muted-foreground'
                                                        }`}>
                                                        {step.title}
                                                    </span>
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <div className="flex-1 h-px bg-border/40 mb-8 mx-4" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <Progress value={(currentStep / steps.length) * 100} className="h-1.5 bg-secondary" />
                                </CardContent>
                            </Card>

                            <AnimatePresence mode="wait">
                                {/* Step 1: Journey Details */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <Card className="glass-card border-accent/5 rounded-[2.5rem] shadow-huge">
                                            <CardHeader className="p-10 pb-0">
                                                <CardTitle className="text-2xl font-display font-bold">Schedule & Venue</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-10 space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Arrival Date</Label>
                                                        <Input
                                                            type="date"
                                                            value={bookingData.pickupDate}
                                                            onChange={(e) => updateBookingData('pickupDate', e.target.value)}
                                                            className="h-14 rounded-xl bg-background/50"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Arrival Hour</Label>
                                                        <Input
                                                            type="time"
                                                            value={bookingData.pickupTime}
                                                            onChange={(e) => updateBookingData('pickupTime', e.target.value)}
                                                            className="h-14 rounded-xl bg-background/50"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Departure Date</Label>
                                                        <Input
                                                            type="date"
                                                            value={bookingData.returnDate}
                                                            onChange={(e) => updateBookingData('returnDate', e.target.value)}
                                                            className="h-14 rounded-xl bg-background/50"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Departure Hour</Label>
                                                        <Input
                                                            type="time"
                                                            value={bookingData.returnTime}
                                                            onChange={(e) => updateBookingData('returnTime', e.target.value)}
                                                            className="h-14 rounded-xl bg-background/50"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pickup Location</Label>
                                                        <div className="relative group">
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                                                            <Input
                                                                value={bookingData.pickupLocation}
                                                                onChange={(e) => updateBookingData('pickupLocation', e.target.value)}
                                                                className="h-14 pl-12 rounded-xl bg-background/50 border-accent/20"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Return Location</Label>
                                                        <div className="relative group">
                                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                                                            <Input
                                                                value={bookingData.returnLocation}
                                                                onChange={(e) => updateBookingData('returnLocation', e.target.value)}
                                                                className="h-14 pl-12 rounded-xl bg-background/50 border-accent/20"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* Step 2: Profile */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <Card className="glass-card border-accent/5 rounded-[2.5rem] shadow-huge">
                                            <CardHeader className="p-10 pb-0">
                                                <CardTitle className="text-2xl font-display font-bold">Personal Portfolio</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-10 space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Given Name</Label>
                                                        <Input
                                                            value={bookingData.firstName}
                                                            onChange={(e) => updateBookingData('firstName', e.target.value)}
                                                            placeholder="Ex: Alexander"
                                                            className="h-14 rounded-xl bg-background/50"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Surname</Label>
                                                        <Input
                                                            value={bookingData.lastName}
                                                            onChange={(e) => updateBookingData('lastName', e.target.value)}
                                                            placeholder="Ex: Romanov"
                                                            className="h-14 rounded-xl bg-background/50"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Hashed Communications</Label>
                                                        <div className="relative">
                                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                                                            <Input
                                                                type="email"
                                                                value={bookingData.email}
                                                                onChange={(e) => updateBookingData('email', e.target.value)}
                                                                placeholder="prestige@residence.com"
                                                                className="h-14 pl-12 rounded-xl bg-background/50"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Secure Line</Label>
                                                        <div className="relative">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                                                            <Input
                                                                type="tel"
                                                                value={bookingData.phone}
                                                                onChange={(e) => updateBookingData('phone', e.target.value)}
                                                                placeholder="+994 (__) ___ __ __"
                                                                className="h-14 pl-12 rounded-xl bg-background/50"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-accent/5 border border-accent/20 rounded-2xl flex items-start gap-4">
                                                    <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        Your dossier is protected by CityCars's privacy encryption standards.
                                                        We never share your personal narrative with third-party entities.
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* Step 3: Privileges */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <Card className="glass-card border-accent/5 rounded-[2.5rem] shadow-huge">
                                            <CardHeader className="p-10 pb-0">
                                                <CardTitle className="text-2xl font-display font-bold">Assurance Protocol</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-10 space-y-4">
                                                {insuranceOptions.map((option) => (
                                                    <label
                                                        key={option.type}
                                                        className={`flex items-start gap-6 p-6 border-2 rounded-[2rem] cursor-pointer transition-all duration-500 ${bookingData.insurance === option.type
                                                            ? 'border-accent bg-accent/10 shadow-lg'
                                                            : 'border-border/30 hover:border-accent/40 bg-background/30'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="insurance"
                                                            value={option.type}
                                                            checked={bookingData.insurance === option.type}
                                                            onChange={(e) => updateBookingData('insurance', e.target.value as any)}
                                                            className="mt-2 w-5 h-5 accent-accent"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="text-xl font-display font-bold">{option.name}</h4>
                                                                <span className="text-xl font-bold text-accent">+${option.price}<span className="text-sm font-normal text-muted-foreground">/d</span></span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mb-4">{option.coverage}</p>
                                                            <div className="flex flex-wrap gap-4">
                                                                {option.features.map((feature, index) => (
                                                                    <div key={index} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary/20 px-3 py-1.5 rounded-lg border border-border/30">
                                                                        <Check className="w-3 h-3 text-accent" />
                                                                        {feature}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </CardContent>
                                        </Card>

                                        <Card className="glass-card border-accent/5 rounded-[2.5rem] shadow-huge">
                                            <CardHeader className="p-10 pb-0">
                                                <CardTitle className="text-2xl font-display font-bold">Bespoke Enhancements</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {addOns.map((addon) => {
                                                    const Icon = addon.icon;
                                                    const isSelected = bookingData[addon.id as keyof BookingData] as boolean;
                                                    return (
                                                        <label
                                                            key={addon.id}
                                                            className={`flex flex-col items-center text-center p-8 border-2 rounded-[2.5rem] cursor-pointer transition-all duration-500 ${isSelected
                                                                ? 'border-accent bg-accent/10 shadow-lg'
                                                                : 'border-border/30 hover:border-accent/40 bg-background/30'
                                                                }`}
                                                        >
                                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all ${isSelected ? 'accent-gradient text-accent-foreground shadow-lg scale-110' : 'bg-secondary/40 text-muted-foreground'
                                                                }`}>
                                                                <Icon className="w-8 h-8" />
                                                            </div>
                                                            <h4 className="font-display font-bold text-lg mb-2">{addon.name}</h4>
                                                            <p className="text-accent font-bold mb-6">+${addon.price}<span className="text-xs font-normal text-muted-foreground">/d</span></p>
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={(e) => updateBookingData(addon.id as keyof BookingData, e.target.checked)}
                                                                className="w-6 h-6 rounded-lg accent-accent"
                                                            />
                                                        </label>
                                                    );
                                                })}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* Step 4: Settlement */}
                                {currentStep === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <Card className="glass-card border-accent/5 rounded-[2.5rem] shadow-huge">
                                            <CardHeader className="p-10 pb-0">
                                                <CardTitle className="text-2xl font-display font-bold">Financial Settlement</CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-10 space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <label
                                                        className={`flex flex-col items-center p-8 border-2 rounded-[2.5rem] cursor-pointer transition-all ${bookingData.paymentMethod === 'card'
                                                            ? 'border-accent bg-accent/10 shadow-lg'
                                                            : 'border-border/30'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="payment"
                                                            value="card"
                                                            checked={bookingData.paymentMethod === 'card'}
                                                            onChange={(e) => updateBookingData('paymentMethod', e.target.value as any)}
                                                            className="sr-only"
                                                        />
                                                        <CardIcon className={`w-12 h-12 mb-4 transition-colors ${bookingData.paymentMethod === 'card' ? 'text-accent' : 'text-muted-foreground'}`} />
                                                        <span className="font-display font-bold text-xl">Digital Transaction</span>
                                                        <span className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-widest text-center">Credit or Debit Card</span>
                                                    </label>

                                                    <label
                                                        className={`flex flex-col items-center p-8 border-2 rounded-[2.5rem] cursor-pointer transition-all ${bookingData.paymentMethod === 'cash'
                                                            ? 'border-accent bg-accent/10 shadow-lg'
                                                            : 'border-border/30'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="payment"
                                                            value="cash"
                                                            checked={bookingData.paymentMethod === 'cash'}
                                                            onChange={(e) => updateBookingData('paymentMethod', e.target.value as any)}
                                                            className="sr-only"
                                                        />
                                                        <span className="text-5xl mb-4">💵</span>
                                                        <span className="font-display font-bold text-xl">Handover Protocol</span>
                                                        <span className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-widest text-center">Pay on Collection</span>
                                                    </label>
                                                </div>

                                                {bookingData.paymentMethod === 'card' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="space-y-8 pt-8 border-t border-border/30"
                                                    >
                                                        <div className="space-y-3">
                                                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Card Number</Label>
                                                            <Input placeholder="•••• •••• •••• ••••" className="h-14 text-xl tracking-widest bg-background/50 rounded-xl" />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-8">
                                                            <div className="space-y-3">
                                                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expiry</Label>
                                                                <Input placeholder="MM/YY" className="h-14 bg-background/50 rounded-xl" />
                                                            </div>
                                                            <div className="space-y-3">
                                                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">CVV/CVC</Label>
                                                                <Input placeholder="•••" className="h-14 bg-background/50 rounded-xl" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Bearer Name</Label>
                                                            <Input placeholder="AS STATED ON CARD" className="h-14 uppercase tracking-widest bg-background/50 rounded-xl" />
                                                        </div>
                                                    </motion.div>
                                                )}

                                                <div className="p-8 bg-green-500/5 border border-green-500/20 rounded-[2rem] flex items-center gap-6">
                                                    <ShieldCheck className="w-10 h-10 text-green-500 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-600 mb-1">Encrypted Terminal</p>
                                                        <p className="text-sm text-muted-foreground">Your financial signature is processed through an isolated, end-to-end encrypted protocol.</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Steering */}
                            <div className="flex gap-6 pt-8">
                                {currentStep > 1 && (
                                    <Button
                                        size="lg"
                                        variant="ghost"
                                        onClick={handlePrevious}
                                        className="h-16 flex-1 rounded-2xl glass-card border-border/40 font-bold uppercase tracking-widest text-xs"
                                    >
                                        <ChevronLeft className="w-5 h-5 mr-3" />
                                        Previous
                                    </Button>
                                )}
                                {currentStep < steps.length ? (
                                    <Button
                                        size="lg"
                                        onClick={handleNext}
                                        className="h-16 flex-1 rounded-2xl accent-gradient text-accent-foreground font-bold uppercase tracking-widest text-xs premium-glow"
                                    >
                                        Proceed
                                        <ChevronRight className="w-5 h-5 ml-3" />
                                    </Button>
                                ) : (
                                    <Button
                                        size="lg"
                                        onClick={handleSubmit}
                                        className="h-16 flex-1 rounded-2xl accent-gradient text-accent-foreground font-bold uppercase tracking-widest text-xs premium-glow"
                                    >
                                        <Sparkles className="w-5 h-5 mr-3" />
                                        Secure Reservation
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Audit Summary Column */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                            <Card className="glass-card border-accent/10 rounded-[3rem] overflow-hidden shadow-huge">
                                <CardHeader className="p-8 pb-0">
                                    <CardTitle className="text-xl font-display font-bold">Booking Audit</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    {/* Asset Identity */}
                                    <div className="p-6 bg-secondary/30 rounded-[2rem] flex items-center gap-6 group hover:translate-x-1 transition-transform">
                                        <div className="w-20 h-20 rounded-2xl accent-gradient flex items-center justify-center text-3xl shadow-lg">🚗</div>
                                        <div>
                                            <p className="text-lg font-display font-bold text-foreground leading-tight">{bookingData.carName}</p>
                                            <p className="text-sm font-bold text-accent">${bookingData.carPrice}<span className="text-muted-foreground font-normal"> / day</span></p>
                                        </div>
                                    </div>

                                    {/* Financial Breakdown */}
                                    <div className="space-y-4 border-y border-border/30 py-8">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Rental Period</span>
                                            <span className="font-bold">{totals.days} day{totals.days !== 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground text-sm font-medium">Asset Allocation</span>
                                            <span className="font-bold text-foreground">${totals.carTotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted-foreground text-sm font-medium">Assurance Premium</span>
                                            <span className="font-bold text-foreground">${totals.insuranceTotal.toFixed(2)}</span>
                                        </div>
                                        {totals.addOnsTotal > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-muted-foreground text-sm font-medium">Bespoke Options</span>
                                                <span className="font-bold text-foreground">${totals.addOnsTotal.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center platinum-text">
                                            <span className="text-muted-foreground text-sm font-medium">Statutory Tax (18%)</span>
                                            <span className="font-bold text-foreground">${totals.tax.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-display font-bold">Total Investment</span>
                                        <span className="text-3xl font-display font-bold text-gradient">${totals.total.toFixed(2)}</span>
                                    </div>

                                    <div className="space-y-3 pt-4">
                                        {[
                                            'Complimentary cancellation',
                                            'Elite concierge support',
                                            'Fully comprehensive protocol'
                                        ].map((perk, i) => (
                                            <div key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                {perk}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Booking;
