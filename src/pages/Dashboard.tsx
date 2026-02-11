import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Car, MapPin, Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Booking {
    id: string;
    carName: string;
    carImage: string;
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: 'active' | 'upcoming' | 'completed' | 'cancelled';
}

const mockBookings: Booking[] = [
    {
        id: 'BK001',
        carName: 'BMW 5 Series',
        carImage: '/placeholder-car.jpg',
        pickupLocation: 'Baku International Airport',
        returnLocation: 'Baku International Airport',
        pickupDate: '2026-01-28',
        returnDate: '2026-02-02',
        totalPrice: 600,
        status: 'upcoming'
    },
    {
        id: 'BK002',
        carName: 'Mercedes E-Class',
        carImage: '/placeholder-car.jpg',
        pickupLocation: 'City Center',
        returnLocation: 'City Center',
        pickupDate: '2026-01-20',
        returnDate: '2026-01-25',
        totalPrice: 700,
        status: 'active'
    },
    {
        id: 'BK003',
        carName: 'Audi Q7',
        carImage: '/placeholder-car.jpg',
        pickupLocation: 'Baku International Airport',
        returnLocation: 'City Center',
        pickupDate: '2025-12-15',
        returnDate: '2025-12-20',
        totalPrice: 900,
        status: 'completed'
    }
];

const Dashboard: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { toast } = useToast();

    const getStatusBadge = (status: Booking['status']) => {
        const variants = {
            active: { label: 'Active', className: 'bg-green-500/10 text-green-500 border-green-500/20' },
            upcoming: { label: 'Upcoming', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
            completed: { label: 'Completed', className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
            cancelled: { label: 'Cancelled', className: 'bg-red-500/10 text-red-500 border-red-500/20' }
        };
        const variant = variants[status];
        return <Badge className={variant.className}>{variant.label}</Badge>;
    };

    const activeBookings = mockBookings.filter(b => b.status === 'active');
    const upcomingBookings = mockBookings.filter(b => b.status === 'upcoming');
    const pastBookings = mockBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

    return (
        <Layout>
            {/* Header */}
            <section className="hero-section py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
                        My Dashboard
                    </h1>
                    <p className="text-primary-foreground/80">
                        Manage your bookings and account
                    </p>
                </div>
            </section>

            {/* Dashboard Content */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        <Card className="card-gradient border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Active Bookings</p>
                                        <p className="text-3xl font-bold text-foreground">{activeBookings.length}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card-gradient border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                                        <p className="text-3xl font-bold text-foreground">{upcomingBookings.length}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-blue-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card-gradient border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Completed</p>
                                        <p className="text-3xl font-bold text-foreground">{pastBookings.length}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-gray-500/10 flex items-center justify-center">
                                        <Car className="w-6 h-6 text-gray-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="card-gradient border-border">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                                        <p className="text-3xl font-bold text-foreground">$2.2K</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-accent" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Active Bookings */}
                    {activeBookings.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Active Bookings</h2>
                            <div className="space-y-4">
                                {activeBookings.map((booking) => (
                                    <Card key={booking.id} className="card-gradient border-border hover-glow">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="w-full md:w-48 h-32 bg-secondary rounded-lg overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                                                        <Car className="w-12 h-12 text-muted-foreground" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-foreground mb-1">{booking.carName}</h3>
                                                            <p className="text-sm text-muted-foreground">Booking ID: {booking.id}</p>
                                                        </div>
                                                        {getStatusBadge(booking.status)}
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="w-4 h-4 text-accent mt-1" />
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground">Pickup</p>
                                                                <p className="text-sm text-muted-foreground">{booking.pickupLocation}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <MapPin className="w-4 h-4 text-accent mt-1" />
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground">Return</p>
                                                                <p className="text-sm text-muted-foreground">{booking.returnLocation}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <Calendar className="w-4 h-4 text-accent mt-1" />
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground">Pickup Date</p>
                                                                <p className="text-sm text-muted-foreground">{booking.pickupDate}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <Calendar className="w-4 h-4 text-accent mt-1" />
                                                            <div>
                                                                <p className="text-sm font-medium text-foreground">Return Date</p>
                                                                <p className="text-sm text-muted-foreground">{booking.returnDate}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-2xl font-bold text-foreground">${booking.totalPrice}</div>
                                                        <div className="flex gap-2">
                                                            <Button variant="outline">View Details</Button>
                                                            <Button className="accent-gradient text-accent-foreground">Manage Booking</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upcoming Bookings */}
                    {upcomingBookings.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Upcoming Bookings</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {upcomingBookings.map((booking) => (
                                    <Card key={booking.id} className="card-gradient border-border hover-glow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-lg font-bold text-foreground">{booking.carName}</h3>
                                                {getStatusBadge(booking.status)}
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="w-4 h-4 text-accent" />
                                                    <span className="text-muted-foreground">{booking.pickupDate} - {booking.returnDate}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <MapPin className="w-4 h-4 text-accent" />
                                                    <span className="text-muted-foreground">{booking.pickupLocation}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-xl font-bold text-foreground">${booking.totalPrice}</div>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => {
                                                        toast({ title: 'Viewing Details', description: 'Loading booking details...' });
                                                        setTimeout(() => navigate('/tracking'), 500);
                                                    }}
                                                >
                                                    View Details
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Past Bookings */}
                    {pastBookings.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-display font-bold text-foreground mb-6">Past Bookings</h2>
                            <div className="space-y-3">
                                {pastBookings.map((booking) => (
                                    <Card key={booking.id} className="card-gradient border-border">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <Car className="w-8 h-8 text-muted-foreground" />
                                                    <div>
                                                        <p className="font-semibold text-foreground">{booking.carName}</p>
                                                        <p className="text-sm text-muted-foreground">{booking.pickupDate} - {booking.returnDate}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    {getStatusBadge(booking.status)}
                                                    <p className="font-bold text-foreground">${booking.totalPrice}</p>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => {
                                                            toast({ title: 'Viewing Booking', description: 'Loading booking history...' });
                                                            setTimeout(() => navigate('/tracking'), 500);
                                                        }}
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Dashboard;
