import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Heart, Share2, Calendar, Users, Fuel, Settings, Star,
    Shield, MapPin, Clock, Check, X, ChevronLeft, ChevronRight,
    Gauge, Zap, Wind, Snowflake, Radio, Bluetooth, Navigation, Car
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFavoritesStore } from '@/hooks/useFavoritesStore';

const CarDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [is360View, setIs360View] = useState(false);

    // Mock car data - in real app, fetch based on id
    const car = {
        id: Number(id) || 1,
        name: 'BMW 5 Series',
        category: 'Luxury Sedan',
        price: 120,
        rating: 4.9,
        reviews: 127,
        seats: 5,
        fuel: 'Petrol',
        transmission: 'Automatic',
        year: 2023,
        mileage: '12,500 km',
        color: 'Midnight Blue',
        images: [
            '/placeholder-car.jpg',
            '/placeholder-car.jpg',
            '/placeholder-car.jpg',
            '/placeholder-car.jpg',
        ],
        features: [
            { icon: Bluetooth, name: 'Bluetooth', included: true },
            { icon: Navigation, name: 'GPS Navigation', included: true },
            { icon: Snowflake, name: 'Climate Control', included: true },
            { icon: Wind, name: 'Sunroof', included: true },
            { icon: Radio, name: 'Premium Audio', included: true },
            { icon: Shield, name: 'Parking Sensors', included: true },
            { icon: Zap, name: 'USB Charging', included: true },
            { icon: Users, name: 'Leather Seats', included: true },
        ],
        specs: {
            engine: '2.0L Turbocharged',
            horsepower: '248 HP',
            acceleration: '0-100 km/h in 6.2s',
            topSpeed: '250 km/h',
            fuelEconomy: '7.5L/100km',
            driveType: 'Rear-Wheel Drive',
        },
        insurance: {
            basic: { name: 'Basic', price: 15, coverage: 'Third-party liability' },
            standard: { name: 'Standard', price: 25, coverage: 'Collision + Theft' },
            premium: { name: 'Premium', price: 40, coverage: 'Full coverage + Roadside' },
        },
    };

    const handleBookNow = () => {
        toast({
            title: 'Proceeding to Booking',
            description: `Booking ${car.name}...`,
        });
        setTimeout(() => {
            navigate('/booking', {
                state: {
                    carId: car.id,
                    carName: car.name,
                    carPrice: car.price
                }
            });
        }, 500);
    };

    const handleToggleFavorite = () => {
        const isAdding = !isFavorite(car.id);
        toggleFavorite(car.id);
        toast({
            title: isAdding ? 'Added to Favorites' : 'Removed from Favorites',
            description: isAdding
                ? 'Car added to your wishlist'
                : 'Car removed from your wishlist',
        });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: 'Link Copied!',
            description: 'Car details link copied to clipboard',
        });
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero-section py-12">
                <div className="container mx-auto px-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/cars')}
                        className="mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Cars
                    </Button>
                    <div className="flex items-start justify-between">
                        <div>
                            <Badge className="mb-2 bg-accent text-accent-foreground">{car.category}</Badge>
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
                                {car.name}
                            </h1>
                            <div className="flex items-center gap-4 text-primary-foreground/80">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{car.rating}</span>
                                    <span>({car.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>Baku, Azerbaijan</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleToggleFavorite}
                                className="rounded-full"
                            >
                                <Heart
                                    className={`w-5 h-5 ${isFavorite(car.id) ? 'fill-red-500 text-red-500' : ''
                                        }`}
                                />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleShare}
                                className="rounded-full"
                            >
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Images & Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Image Gallery */}
                            <Card className="card-gradient border-border overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="relative h-96 bg-secondary">
                                        {/* Main Image */}
                                        <div className="w-full h-full relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Zap className="w-32 h-32 text-accent/20 animate-pulse" />
                                            </div>
                                            <img
                                                src={car.images[currentImageIndex]}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                }}
                                            />
                                        </div>

                                        {/* Navigation Arrows */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 rounded-full"
                                            onClick={prevImage}
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 rounded-full"
                                            onClick={nextImage}
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </Button>

                                        {/* 360 View Toggle */}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="absolute bottom-4 right-4"
                                            onClick={() => setIs360View(!is360View)}
                                        >
                                            {is360View ? 'Exit' : 'View'} 360°
                                        </Button>

                                        {/* Image Counter */}
                                        <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-full text-sm">
                                            {currentImageIndex + 1} / {car.images.length}
                                        </div>
                                    </div>

                                    {/* Thumbnail Strip */}
                                    <div className="flex gap-2 p-4 overflow-x-auto">
                                        {car.images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${currentImageIndex === index
                                                    ? 'border-accent'
                                                    : 'border-border opacity-50'
                                                    }`}
                                            >
                                                <div className="w-full h-full bg-secondary rounded flex items-center justify-center">
                                                    <Car className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tabs - Overview, Specs, Features */}
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                                    <TabsTrigger value="features">Features</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="mt-6">
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold mb-4">About this car</h3>
                                            <p className="text-muted-foreground mb-6">
                                                Experience luxury and performance with the {car.name}. This premium sedan combines elegant design with cutting-edge technology, making it perfect for both business and leisure travel in Baku.
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                                                    <Calendar className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                    <p className="text-sm text-muted-foreground">Year</p>
                                                    <p className="font-bold">{car.year}</p>
                                                </div>
                                                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                                                    <Gauge className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                    <p className="text-sm text-muted-foreground">Mileage</p>
                                                    <p className="font-bold">{car.mileage}</p>
                                                </div>
                                                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                                                    <Settings className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                    <p className="text-sm text-muted-foreground">Transmission</p>
                                                    <p className="font-bold">{car.transmission}</p>
                                                </div>
                                                <div className="text-center p-4 bg-secondary/30 rounded-lg">
                                                    <Fuel className="w-6 h-6 mx-auto mb-2 text-accent" />
                                                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                                                    <p className="font-bold">{car.fuel}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="specs" className="mt-6">
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                                            <div className="space-y-3">
                                                {Object.entries(car.specs).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                                                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                        <span className="font-semibold">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="features" className="mt-6">
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold mb-4">Included Features</h3>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {car.features.map((feature, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
                                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${feature.included ? 'bg-green-500/20' : 'bg-red-500/20'
                                                            }`}>
                                                            {feature.included ? (
                                                                <Check className="w-5 h-5 text-green-500" />
                                                            ) : (
                                                                <X className="w-5 h-5 text-red-500" />
                                                            )}
                                                        </div>
                                                        <span className="text-sm font-medium">{feature.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Right Column - Booking Card */}
                        <div className="lg:col-span-1">
                            <Card className="card-gradient border-border sticky top-24">
                                <CardContent className="p-6">
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-4xl font-bold text-foreground">${car.price}</span>
                                            <span className="text-muted-foreground">/day</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Free cancellation up to 24h before pickup</p>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Pickup Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="date"
                                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Return Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                    type="date"
                                                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6 p-4 rounded-xl bg-secondary/30 border border-border/50">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-muted-foreground">Price per day</span>
                                            <span className="font-bold">${car.price}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-muted-foreground">Insurance</span>
                                            <span className="font-bold">$0</span>
                                        </div>
                                        <div className="pt-2 mt-2 border-t border-border flex justify-between items-center">
                                            <span className="font-bold">Total Estimated</span>
                                            <span className="text-2xl font-bold text-accent">${car.price}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleBookNow}
                                        className="w-full h-14 rounded-2xl accent-gradient text-accent-foreground text-lg font-bold premium-glow hover:translate-y-[-2px] transition-all"
                                    >
                                        Complete Reservation
                                    </Button>

                                    <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            <span>Verified and insured</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>24/7 customer support</span>
                                        </div>
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

export default CarDetails;
