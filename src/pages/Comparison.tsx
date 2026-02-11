import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Check, Star, Users, Fuel, Settings, Calendar, Gauge } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Car {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    seats: number;
    fuel: string;
    transmission: string;
    year: number;
    horsepower: string;
    acceleration: string;
    features: string[];
}

const Comparison: React.FC = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    // Mock comparison data - in real app, get from state/URL params
    const [comparedCars, setComparedCars] = useState<Car[]>([
        {
            id: 1,
            name: 'BMW 5 Series',
            category: 'Luxury Sedan',
            price: 120,
            rating: 4.9,
            seats: 5,
            fuel: 'Petrol',
            transmission: 'Automatic',
            year: 2023,
            horsepower: '248 HP',
            acceleration: '6.2s',
            features: ['GPS', 'Bluetooth', 'Sunroof', 'Leather Seats', 'Climate Control'],
        },
        {
            id: 2,
            name: 'Mercedes E-Class',
            category: 'Luxury Sedan',
            price: 150,
            rating: 4.8,
            seats: 5,
            fuel: 'Diesel',
            transmission: 'Automatic',
            year: 2023,
            horsepower: '272 HP',
            acceleration: '5.9s',
            features: ['GPS', 'Bluetooth', 'Sunroof', 'Leather Seats', 'Parking Sensors'],
        },
        {
            id: 3,
            name: 'Audi A6',
            category: 'Luxury Sedan',
            price: 140,
            rating: 4.7,
            seats: 5,
            fuel: 'Petrol',
            transmission: 'Automatic',
            year: 2023,
            horsepower: '261 HP',
            acceleration: '6.0s',
            features: ['GPS', 'Bluetooth', 'Climate Control', 'Premium Audio', 'LED Lights'],
        },
    ]);

    const allFeatures = Array.from(
        new Set(comparedCars.flatMap((car) => car.features))
    );

    const removeCar = (id: number) => {
        setComparedCars(comparedCars.filter((car) => car.id !== id));
        toast({
            title: 'Car Removed',
            description: 'Car removed from comparison',
        });
    };

    const handleBookCar = (car: Car) => {
        toast({
            title: 'Booking Car',
            description: `Proceeding to book ${car.name}...`,
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

    if (comparedCars.length === 0) {
        return (
            <Layout>
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4">No Cars to Compare</h2>
                        <p className="text-muted-foreground mb-6">
                            Add cars from the cars page to compare them
                        </p>
                        <Button onClick={() => navigate('/cars')} className="accent-gradient text-accent-foreground">
                            Browse Cars
                        </Button>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Header */}
            <section className="hero-section py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
                        Compare Cars
                    </h1>
                    <p className="text-primary-foreground/80">
                        Side-by-side comparison of {comparedCars.length} vehicles
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Feature Names Column */}
                                <div className="space-y-4">
                                    {/* Empty header space */}
                                    <div className="h-80"></div>

                                    {/* Price */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Price per Day</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Rating */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Rating</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Seats */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Seats</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Fuel */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Fuel Type</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Transmission */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Transmission</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Year */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Year</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Horsepower */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">Horsepower</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Acceleration */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold">0-100 km/h</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Features Header */}
                                    <Card className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg">Features</h3>
                                        </CardContent>
                                    </Card>

                                    {/* Individual Features */}
                                    {allFeatures.map((feature) => (
                                        <Card key={feature} className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <p className="text-sm">{feature}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>

                                {/* Car Columns */}
                                {comparedCars.map((car) => (
                                    <div key={car.id} className="space-y-4">
                                        {/* Car Card */}
                                        <Card className="card-gradient border-border overflow-hidden hover-glow">
                                            <CardContent className="p-0">
                                                <div className="relative">
                                                    <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                                                        <div className="text-6xl">🚗</div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="absolute top-2 right-2 bg-background/80 rounded-full"
                                                        onClick={() => removeCar(car.id)}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                <div className="p-4">
                                                    <Badge className="mb-2 bg-accent text-accent-foreground">
                                                        {car.category}
                                                    </Badge>
                                                    <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                                                    <Button
                                                        onClick={() => handleBookCar(car)}
                                                        className="w-full accent-gradient text-accent-foreground"
                                                    >
                                                        Book Now
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Price */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <p className="text-2xl font-bold text-accent">${car.price}</p>
                                            </CardContent>
                                        </Card>

                                        {/* Rating */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                    <span className="font-semibold">{car.rating}</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Seats */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-muted-foreground" />
                                                    <span>{car.seats}</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Fuel */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Fuel className="w-4 h-4 text-muted-foreground" />
                                                    <span>{car.fuel}</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Transmission */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Settings className="w-4 h-4 text-muted-foreground" />
                                                    <span>{car.transmission}</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Year */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                                    <span>{car.year}</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Horsepower */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Gauge className="w-4 h-4 text-muted-foreground" />
                                                    <span>{car.horsepower}</span>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Acceleration */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <span className="font-semibold">{car.acceleration}</span>
                                            </CardContent>
                                        </Card>

                                        {/* Features Header Spacer */}
                                        <Card className="card-gradient border-border">
                                            <CardContent className="p-4">
                                                <span className="text-sm text-muted-foreground">
                                                    {car.features.length} features
                                                </span>
                                            </CardContent>
                                        </Card>

                                        {/* Individual Features */}
                                        {allFeatures.map((feature) => (
                                            <Card key={feature} className="card-gradient border-border">
                                                <CardContent className="p-4 flex items-center justify-center">
                                                    {car.features.includes(feature) ? (
                                                        <Check className="w-5 h-5 text-green-500" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-red-500" />
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-4 mt-8">
                        <Button variant="outline" onClick={() => navigate('/cars')}>
                            Add More Cars
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                toast({
                                    title: 'Comparison Exported',
                                    description: 'Comparison table saved as PDF',
                                });
                            }}
                        >
                            Export as PDF
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Comparison;
