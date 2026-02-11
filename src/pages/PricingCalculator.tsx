import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Calendar as CalendarIcon, Car, Shield, Navigation, Baby, Wifi, Check } from 'lucide-react';
import { format } from 'date-fns';

interface AddOn {
    id: string;
    name: string;
    price: number;
    icon: React.ReactNode;
    description: string;
}

const carTypes = [
    { id: 'economy', name: 'Economy', basePrice: 40 },
    { id: 'compact', name: 'Compact', basePrice: 60 },
    { id: 'sedan', name: 'Sedan', basePrice: 80 },
    { id: 'luxury', name: 'Luxury Sedan', basePrice: 120 },
    { id: 'suv', name: 'SUV', basePrice: 100 },
    { id: 'premium-suv', name: 'Premium SUV', basePrice: 180 },
];

const addOns: AddOn[] = [
    {
        id: 'insurance',
        name: 'Full Insurance',
        price: 15,
        icon: <Shield className="w-5 h-5" />,
        description: 'Complete coverage for peace of mind'
    },
    {
        id: 'gps',
        name: 'GPS Navigation',
        price: 5,
        icon: <Navigation className="w-5 h-5" />,
        description: 'Never get lost with premium GPS'
    },
    {
        id: 'child-seat',
        name: 'Child Seat',
        price: 8,
        icon: <Baby className="w-5 h-5" />,
        description: 'Safety seat for children'
    },
    {
        id: 'wifi',
        name: 'WiFi Hotspot',
        price: 10,
        icon: <Wifi className="w-5 h-5" />,
        description: 'Stay connected on the go'
    },
];

const PricingCalculator: React.FC = () => {
    const [selectedCarType, setSelectedCarType] = useState('sedan');
    const [pickupDate, setPickupDate] = useState<Date>();
    const [returnDate, setReturnDate] = useState<Date>();
    const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        calculatePrice();
    }, [selectedCarType, pickupDate, returnDate, selectedAddOns]);

    const calculatePrice = () => {
        if (!pickupDate || !returnDate) {
            setTotalPrice(0);
            setDays(0);
            return;
        }

        const diffTime = Math.abs(returnDate.getTime() - pickupDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDays(diffDays);

        const carType = carTypes.find(ct => ct.id === selectedCarType);
        const basePrice = carType ? carType.basePrice * diffDays : 0;

        const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
            const addOn = addOns.find(a => a.id === addOnId);
            return total + (addOn ? addOn.price * diffDays : 0);
        }, 0);

        // Apply discount for longer rentals
        let discount = 0;
        if (diffDays >= 30) {
            discount = 0.25; // 25% off for 30+ days
        } else if (diffDays >= 14) {
            discount = 0.15; // 15% off for 14+ days
        } else if (diffDays >= 7) {
            discount = 0.10; // 10% off for 7+ days
        }

        const subtotal = basePrice + addOnsPrice;
        const discountAmount = subtotal * discount;
        const total = subtotal - discountAmount;

        setTotalPrice(total);
    };

    const toggleAddOn = (addOnId: string) => {
        setSelectedAddOns(prev =>
            prev.includes(addOnId)
                ? prev.filter(id => id !== addOnId)
                : [...prev, addOnId]
        );
    };

    const carType = carTypes.find(ct => ct.id === selectedCarType);
    const basePrice = carType && days > 0 ? carType.basePrice * days : 0;
    const addOnsPrice = selectedAddOns.reduce((total, addOnId) => {
        const addOn = addOns.find(a => a.id === addOnId);
        return total + (addOn && days > 0 ? addOn.price * days : 0);
    }, 0);

    const discount = days >= 30 ? 0.25 : days >= 14 ? 0.15 : days >= 7 ? 0.10 : 0;
    const discountAmount = (basePrice + addOnsPrice) * discount;

    return (
        <Layout>
            {/* Header */}
            <section className="hero-section py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                        <Calculator className="w-8 h-8 text-accent" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
                        Pricing Calculator
                    </h1>
                    <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                        Get an instant quote for your car rental. Transparent pricing with no hidden fees.
                    </p>
                </div>
            </section>

            {/* Calculator */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Configuration */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Car Type Selection */}
                                <Card className="card-gradient border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Car className="w-5 h-5" />
                                            Select Vehicle Type
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {carTypes.map((car) => (
                                                <button
                                                    key={car.id}
                                                    onClick={() => setSelectedCarType(car.id)}
                                                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${selectedCarType === car.id
                                                            ? 'border-accent bg-accent/10'
                                                            : 'border-border hover:border-accent/50'
                                                        }`}
                                                >
                                                    <div className="text-2xl mb-2">🚗</div>
                                                    <p className="font-semibold text-foreground">{car.name}</p>
                                                    <p className="text-sm text-muted-foreground">${car.basePrice}/day</p>
                                                </button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Date Selection */}
                                <Card className="card-gradient border-border">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CalendarIcon className="w-5 h-5" />
                                            Rental Period
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Pickup Date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-start text-left font-normal"
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {pickupDate ? format(pickupDate, 'PPP') : 'Select date'}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 bg-popover border-border">
                                                        <Calendar
                                                            mode="single"
                                                            selected={pickupDate}
                                                            onSelect={setPickupDate}
                                                            disabled={(date) => date < new Date()}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Return Date</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-start text-left font-normal"
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {returnDate ? format(returnDate, 'PPP') : 'Select date'}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 bg-popover border-border">
                                                        <Calendar
                                                            mode="single"
                                                            selected={returnDate}
                                                            onSelect={setReturnDate}
                                                            disabled={(date) => !pickupDate || date <= pickupDate}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                        {days > 0 && (
                                            <p className="text-sm text-muted-foreground mt-4">
                                                Rental duration: <span className="font-semibold text-foreground">{days} days</span>
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Add-ons */}
                                <Card className="card-gradient border-border">
                                    <CardHeader>
                                        <CardTitle>Additional Services</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {addOns.map((addOn) => (
                                                <div
                                                    key={addOn.id}
                                                    className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer"
                                                    onClick={() => toggleAddOn(addOn.id)}
                                                >
                                                    <Checkbox
                                                        checked={selectedAddOns.includes(addOn.id)}
                                                        onCheckedChange={() => toggleAddOn(addOn.id)}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            {addOn.icon}
                                                            <p className="font-semibold text-foreground">{addOn.name}</p>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{addOn.description}</p>
                                                    </div>
                                                    <p className="font-bold text-foreground">${addOn.price}/day</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Price Summary */}
                            <div className="lg:col-span-1">
                                <Card className="card-gradient border-border sticky top-24">
                                    <CardHeader>
                                        <CardTitle>Price Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {days > 0 ? (
                                            <>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Vehicle ({days} days)</span>
                                                        <span className="font-semibold text-foreground">${basePrice}</span>
                                                    </div>
                                                    {selectedAddOns.length > 0 && (
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Add-ons ({days} days)</span>
                                                            <span className="font-semibold text-foreground">${addOnsPrice}</span>
                                                        </div>
                                                    )}
                                                    {discount > 0 && (
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-green-500">Discount ({discount * 100}%)</span>
                                                            <span className="font-semibold text-green-500">-${discountAmount.toFixed(2)}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-t border-border pt-4">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <span className="text-lg font-bold text-foreground">Total</span>
                                                        <span className="text-3xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
                                                    </div>
                                                    <Button className="w-full accent-gradient text-accent-foreground h-12 text-lg">
                                                        Get Quote
                                                    </Button>
                                                </div>

                                                {discount > 0 && (
                                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                                                        <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                                                            <Check className="w-4 h-4" />
                                                            You're saving ${discountAmount.toFixed(2)} with our long-term discount!
                                                        </p>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                                                <p className="text-muted-foreground">
                                                    Select dates to see pricing
                                                </p>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PricingCalculator;
