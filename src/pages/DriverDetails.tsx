import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    Star, MapPin, Calendar, Clock, Shield, Award,
    Languages, Car, ThumbsUp, ChevronLeft, Phone, Mail,
    CheckCircle2, TrendingUp, MessageCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Review {
    id: number;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
}

const DriverDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [selectedService, setSelectedService] = useState<string>('');

    // Mock driver data
    const driver = {
        id: Number(id) || 1,
        name: 'Rashad Mammadov',
        avatar: null,
        rating: 4.9,
        totalRides: 847,
        yearsExperience: 8,
        languages: ['English', 'Russian', 'Azerbaijani', 'Turkish'],
        location: 'Baku, Azerbaijan',
        verified: true,
        specialties: ['Airport Transfer', 'City Tours', 'Corporate Events'],
        hourlyRate: 50,
        bio: 'Professional driver with 8 years of experience in luxury transportation. Specialized in airport transfers and corporate services. Fluent in 4 languages and familiar with all major routes in Baku and surrounding areas.',
        stats: {
            punctuality: 98,
            professionalism: 99,
            vehicleCondition: 97,
            communication: 96,
        },
        achievements: [
            { icon: Award, title: 'Top Rated Driver 2023', description: 'Maintained 4.9+ rating' },
            { icon: Shield, title: 'Safety Champion', description: 'Zero incidents record' },
            { icon: TrendingUp, title: '500+ Rides', description: 'Completed successfully' },
            { icon: ThumbsUp, title: 'Customer Favorite', description: '95% repeat customers' },
        ],
        reviews: [
            {
                id: 1,
                author: 'John Smith',
                rating: 5,
                date: '2024-01-15',
                comment: 'Excellent service! Very professional and punctual. The car was spotless and Rashad was very knowledgeable about the city.',
                verified: true,
            },
            {
                id: 2,
                author: 'Sarah Johnson',
                rating: 5,
                date: '2024-01-10',
                comment: 'Best driver experience in Baku! Rashad was waiting at the airport with a sign, helped with luggage, and gave great recommendations for restaurants.',
                verified: true,
            },
            {
                id: 3,
                author: 'Michael Chen',
                rating: 4,
                date: '2024-01-05',
                comment: 'Very good service. Professional driver, clean car, and smooth ride. Would recommend!',
                verified: true,
            },
        ] as Review[],
        availability: {
            monday: '24/7',
            tuesday: '24/7',
            wednesday: '24/7',
            thursday: '24/7',
            friday: '24/7',
            saturday: '24/7',
            sunday: '24/7',
        },
    };

    const handleHireDriver = () => {
        if (!selectedService) {
            toast({
                title: 'Select a Service',
                description: 'Please select a service type before booking',
                variant: 'destructive',
            });
            return;
        }

        toast({
            title: 'Booking Driver',
            description: `Booking ${driver.name} for ${selectedService}...`,
        });

        setTimeout(() => {
            navigate('/contact', { state: { driver: driver.name, service: selectedService } });
        }, 1000);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="hero-section py-12">
                <div className="container mx-auto px-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/drivers')}
                        className="mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Back to Drivers
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Driver Profile Card */}
                        <div className="md:col-span-1">
                            <Card className="card-gradient border-border">
                                <CardContent className="p-6 text-center">
                                    <Avatar className="w-32 h-32 mx-auto mb-4">
                                        <AvatarFallback className="text-3xl accent-gradient text-accent-foreground">
                                            {driver.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>

                                    <h2 className="text-2xl font-bold text-foreground mb-1">{driver.name}</h2>

                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">{driver.rating}</span>
                                        </div>
                                        <span className="text-muted-foreground">•</span>
                                        <span className="text-muted-foreground">{driver.totalRides} rides</span>
                                    </div>

                                    {driver.verified && (
                                        <Badge className="mb-4 bg-green-500 text-white">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Verified Driver
                                        </Badge>
                                    )}

                                    <div className="space-y-2 text-sm text-left mb-6">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            <span>{driver.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>{driver.yearsExperience} years experience</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Languages className="w-4 h-4" />
                                            <span>{driver.languages.join(', ')}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mb-4">
                                        <Button variant="outline" className="flex-1">
                                            <Phone className="w-4 h-4 mr-2" />
                                            Call
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                            <Mail className="w-4 h-4 mr-2" />
                                            Email
                                        </Button>
                                    </div>
                                    <Button
                                        className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold"
                                        onClick={() => window.open(`https://wa.me/994000000000?text=Hello, I would like to book ${driver.name}`, '_blank')}
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Chat on WhatsApp
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-6">
                            {/* About */}
                            <Card className="card-gradient border-border">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-3">About</h3>
                                    <p className="text-muted-foreground mb-4">{driver.bio}</p>

                                    <div className="flex flex-wrap gap-2">
                                        {driver.specialties.map((specialty, index) => (
                                            <Badge key={index} variant="secondary">
                                                {specialty}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="card-gradient border-border">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-4">Performance</h3>
                                        <div className="space-y-4">
                                            {Object.entries(driver.stats).map(([key, value]) => (
                                                <div key={key}>
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm font-medium capitalize">
                                                            {key.replace(/([A-Z])/g, ' $1')}
                                                        </span>
                                                        <span className="text-sm font-bold">{value}%</span>
                                                    </div>
                                                    <Progress value={value} className="h-2" />
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="card-gradient border-border">
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold mb-4">Weekly Schedule</h3>
                                        <div className="grid grid-cols-7 gap-1 text-center">
                                            {Object.entries(driver.availability).map(([day, time]) => (
                                                <div key={day} className="flex flex-col items-center">
                                                    <span className="text-[10px] uppercase font-bold text-muted-foreground mb-2">{day.slice(0, 3)}</span>
                                                    <div className="w-full aspect-square rounded-md bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    </div>
                                                    <span className="text-[10px] mt-1 font-medium">{time}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-4 text-center italic">
                                            * Schedule may vary on public holidays
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Achievements */}
                            <Card className="card-gradient border-border">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-4">Achievements & Badges</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {driver.achievements.map((achievement, index) => (
                                            <div key={index} className="flex items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                    <achievement.icon className="w-5 h-5 text-accent" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                                                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Reviews */}
                            <Card className="card-gradient border-border">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                                    <div className="space-y-4">
                                        {driver.reviews.map((review) => (
                                            <div key={review.id} className="p-4 bg-secondary/30 rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold">{review.author}</span>
                                                            {review.verified && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                                                    Verified
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex">{renderStars(review.rating)}</div>
                                                            <span className="text-xs text-muted-foreground">{review.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Section */}
            <section className="py-12 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <Card className="card-gradient border-border max-w-4xl mx-auto">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-6 text-center">Book {driver.name}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {driver.specialties.map((service, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedService(service)}
                                        className={`p-4 rounded-lg border-2 transition-all ${selectedService === service
                                            ? 'border-accent bg-accent/10'
                                            : 'border-border hover:border-accent/50'
                                            }`}
                                    >
                                        <Car className="w-8 h-8 mx-auto mb-2 text-accent" />
                                        <p className="font-semibold text-sm">{service}</p>
                                        <p className="text-xs text-muted-foreground mt-1">From ${driver.hourlyRate}/hr</p>
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Pickup Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Estimated Duration</label>
                                    <select className="w-full px-4 py-2 bg-background border border-border rounded-lg">
                                        <option>1 hour</option>
                                        <option>2 hours</option>
                                        <option>4 hours</option>
                                        <option>8 hours</option>
                                        <option>Full day</option>
                                    </select>
                                </div>
                            </div>

                            <Button
                                onClick={handleHireDriver}
                                className="w-full h-12 accent-gradient text-accent-foreground text-lg font-semibold"
                            >
                                Hire Driver - ${driver.hourlyRate}/hour
                            </Button>

                            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Shield className="w-4 h-4" />
                                    <span>Insured & Licensed</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>Available 24/7</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </Layout>
    );
};

export default DriverDetails;
