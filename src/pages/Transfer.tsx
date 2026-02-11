import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { MapPin, Calendar, Users, Car, Plane, Building2, Hotel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

const vehicleTypes = [
  { id: 'sedan', name: 'Sedan', capacity: '1-3', price: 35 },
  { id: 'suv', name: 'SUV', capacity: '1-5', price: 50 },
  { id: 'van', name: 'Van', capacity: '1-7', price: 70 },
  { id: 'luxury', name: 'Luxury', capacity: '1-3', price: 100 },
];

const popularRoutes = [
  { from: 'Baku Airport', to: 'City Center', icon: Plane, price: 35 },
  { from: 'Baku', to: 'Sheki', icon: Building2, price: 150 },
  { from: 'Baku', to: 'Gabala', icon: Hotel, price: 120 },
];

const Transfer: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            {t('transfer')}
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Comfortable and reliable transfer services across Azerbaijan
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="card-gradient border-border shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
                  {t('bookTransfer')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {t('from')}
                    </label>
                    <Input 
                      placeholder="Pickup location" 
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {t('to')}
                    </label>
                    <Input 
                      placeholder="Drop-off location" 
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      {t('pickupDate')}
                    </label>
                    <Input 
                      type="datetime-local" 
                      className="h-12 bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      {t('passengers')}
                    </label>
                    <Select defaultValue="2">
                      <SelectTrigger className="h-12 bg-secondary/50 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {[1, 2, 3, 4, 5, 6, 7].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Vehicle Type Selection */}
                <div className="mb-8">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-4">
                    <Car className="w-4 h-4 text-accent" />
                    {t('selectVehicle')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {vehicleTypes.map((vehicle) => (
                      <button
                        key={vehicle.id}
                        onClick={() => setSelectedVehicle(vehicle.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedVehicle === vehicle.id
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <Car className={`w-8 h-8 mx-auto mb-2 ${
                          selectedVehicle === vehicle.id ? 'text-accent' : 'text-muted-foreground'
                        }`} />
                        <p className="font-semibold text-foreground">{t(vehicle.id)}</p>
                        <p className="text-xs text-muted-foreground">{vehicle.capacity} pax</p>
                        <p className="text-sm font-bold text-accent mt-1">${vehicle.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button className="w-full h-14 text-lg accent-gradient text-accent-foreground hover:opacity-90">
                  {t('bookTransfer')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {popularRoutes.map((route, index) => (
              <Card 
                key={index}
                className="card-gradient border-border hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <route.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{route.from}</p>
                      <p className="text-sm text-muted-foreground">→ {route.to}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">${route.price}</span>
                    <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                      Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Transfer;
