import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, X, Calendar, Users, Fuel, Settings, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface FavoriteCar {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
    seats: number;
    fuel: string;
    transmission: string;
    rating: number;
}

const mockFavorites: FavoriteCar[] = [
    {
        id: 1,
        name: 'BMW 5 Series',
        category: 'Luxury Sedan',
        image: '/placeholder-car.jpg',
        price: 120,
        seats: 5,
        fuel: 'Petrol',
        transmission: 'Automatic',
        rating: 4.9
    },
    {
        id: 3,
        name: 'Audi Q7',
        category: 'Premium SUV',
        image: '/placeholder-car.jpg',
        price: 180,
        seats: 7,
        fuel: 'Diesel',
        transmission: 'Automatic',
        rating: 4.9
    },
    {
        id: 5,
        name: 'Range Rover Sport',
        category: 'Luxury SUV',
        image: '/placeholder-car.jpg',
        price: 250,
        seats: 5,
        fuel: 'Diesel',
        transmission: 'Automatic',
        rating: 4.9
    }
];

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoriteCar[]>(mockFavorites);
    const { toast } = useToast();
    const navigate = useNavigate();

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter(car => car.id !== id));
        toast({
            title: 'Removed from Favorites',
            description: 'The car has been removed from your wishlist.',
        });
    };

    return (
        <Layout>
            {/* Header */}
            <section className="hero-section py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Heart className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
                            My Favorites
                        </h1>
                    </div>
                    <p className="text-primary-foreground/80">
                        Your saved vehicles for quick access
                    </p>
                </div>
            </section>

            {/* Favorites Grid */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    {favorites.length === 0 ? (
                        <Card className="glass-card border-border">
                            <CardContent className="p-12 text-center">
                                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                                    No Favorites Yet
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Start adding cars to your wishlist to see them here
                                </p>
                                <Button
                                    onClick={() => {
                                        toast({ title: 'Redirecting to Booking', description: 'Preparing to book this vehicle...' });
                                        setTimeout(() => navigate('/cars'), 500);
                                    }}
                                    className="accent-gradient text-accent-foreground"
                                >
                                    Browse Cars
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-muted-foreground">
                                    {favorites.length} {favorites.length === 1 ? 'car' : 'cars'} in your wishlist
                                </p>
                                <Button variant="outline" size="sm">
                                    Share Wishlist
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((car, index) => (
                                    <Card
                                        key={car.id}
                                        className="group overflow-hidden card-gradient border-border hover:shadow-2xl transition-all duration-500 animate-slide-up hover-glow"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="relative h-56 overflow-hidden bg-secondary">
                                            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                                                <div className="text-6xl">🚗</div>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-current" />
                                                {car.rating}
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-4 left-4 rounded-full"
                                                onClick={() => removeFavorite(car.id)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <CardContent className="p-6">
                                            <div className="mb-4">
                                                <p className="text-sm text-accent font-medium">{car.category}</p>
                                                <h3 className="text-xl font-display font-bold text-foreground">{car.name}</h3>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {car.seats}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Fuel className="w-4 h-4" />
                                                    {car.fuel}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Settings className="w-4 h-4" />
                                                    Auto
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-foreground">${car.price}</span>
                                                    <span className="text-sm text-muted-foreground">/day</span>
                                                </div>
                                                <Button
                                                    onClick={() => navigate('/booking', { state: { carId: car.id, carName: car.name, carPrice: car.price } })}
                                                    className="accent-gradient text-accent-foreground hover:opacity-90"
                                                >
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Book Now
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Favorites;
