import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Users, Fuel, Settings, Star, Search, Filter, SlidersHorizontal, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import api from '@/services/api';

// Define the interface to match backend data
interface Car {
  id: number;
  name: string;
  price: number;
  type: string;
  image: string;
  fuel: string;
  seats: number;
  transmission: string;
  rating: number;
}

const Cars: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for cars data
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('/cars');
        // Ensure default values for potentially missing fields if backend doesn't provide them
        const processedCars = response.data.map((car: any) => ({
          ...car,
          rating: car.rating || 5.0,
          seats: car.seats || 5,
          transmission: car.transmission || 'Automatic',
          fuel: car.fuel || 'Petrol'
        }));
        setCars(processedCars);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        toast({
          title: "Error",
          description: "Could not load vehicle data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [toast]);

  const handleBookNow = (car: Car) => {
    toast({
      title: 'Initiating Reservation 🏎️',
      description: `Securing your ${car.name}...`,
    });

    setTimeout(() => {
      navigate('/booking', {
        state: {
          carId: car.id,
          carName: car.name,
          carPrice: car.price
        }
      });
    }, 800);
  };

  // Filter logic
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || car.type.toLowerCase().includes(categoryFilter.toLowerCase());

    let matchesPrice = true;
    if (priceFilter === '0-100') matchesPrice = car.price <= 100;
    else if (priceFilter === '100-200') matchesPrice = car.price > 100 && car.price <= 200;
    else if (priceFilter === '200+') matchesPrice = car.price > 200;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <Layout>
      {/* Immersive Header Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-background">
        <div className="absolute top-0 left-0 w-full h-[500px] premium-gradient opacity-10 blur-[100px] rounded-full -translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 border-accent/30 text-accent font-bold uppercase tracking-[0.2em] bg-accent/5">
              Premium Fleet
            </Badge>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              The <span className="text-gradient">Collection</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A curated selection of the world's finest automobiles,
              waiting to transform your Azerbaijani journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Advanced Filters & Results */}
      <section className="pb-32 bg-background relative">
        <div className="container mx-auto px-4">

          {/* Refined Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-[2.5rem] p-4 md:p-8 mb-16 border-accent/10 shadow-huge"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
                <Input
                  placeholder="Search by model or brand..."
                  className="h-16 pl-14 pr-6 rounded-2xl bg-background/50 border-border/50 focus:border-accent/40 focus:ring-2 focus:ring-accent/10 text-lg transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="lg:col-span-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="h-16 rounded-2xl bg-background/50 border-border/50 focus:ring-accent/10">
                    <div className="flex items-center gap-3">
                      <Filter className="w-4 h-4 text-accent" />
                      <SelectValue placeholder="Category" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/40">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="sedan">Luxury Sedan</SelectItem>
                    <SelectItem value="suv">Premium SUV</SelectItem>
                    <SelectItem value="sports">Sports Performance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="h-16 rounded-2xl bg-background/50 border-border/50 focus:ring-accent/10">
                    <div className="flex items-center gap-3">
                      <SlidersHorizontal className="w-4 h-4 text-accent" />
                      <SelectValue placeholder="Price Range" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/40">
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="0-100">$0 — $100</SelectItem>
                    <SelectItem value="100-200">$100 — $200</SelectItem>
                    <SelectItem value="200+">$200 — $500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-4">
                <Button size="lg" className="w-full h-16 rounded-2xl accent-gradient text-accent-foreground font-bold text-lg premium-glow">
                  Refine Collection
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Cars Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No vehicles found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setPriceFilter('all'); }}
                className="text-accent mt-4"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden glass-card border-accent/5 hover:border-accent/30 shadow-huge transition-all duration-700 rounded-[3rem] hover:-translate-y-3">
                    {/* Media Section */}
                    <div
                      className="relative h-64 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/cars/${car.id}`)}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2070'; // Fallback image
                        }}
                      />
                      <div className="absolute top-6 right-6 glass-card border-white/20 px-4 py-2 rounded-2xl text-white font-bold text-xs flex items-center gap-2 backdrop-blur-md">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        {car.rating}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
                    </div>

                    <CardContent className="p-8 relative">
                      <div className="mb-6 cursor-pointer" onClick={() => navigate(`/cars/${car.id}`)}>
                        <Badge variant="outline" className="p-0 border-none text-accent font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
                          {car.type}
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground group-hover:text-accent transition-colors">
                          {car.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                          { icon: <Users className="w-4 h-4" />, label: car.seats },
                          { icon: <Fuel className="w-4 h-4" />, label: car.fuel },
                          { icon: <Settings className="w-4 h-4" />, label: car.transmission },
                        ].map((spec, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-2xl border border-border/40 bg-secondary/20">
                            <div className="text-accent">{spec.icon}</div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{spec.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-4 pt-6 border-t border-border/40">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-display font-bold text-foreground">${car.price}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">/ day</span>
                          </div>
                          <Button
                            variant="ghost"
                            onClick={() => navigate(`/cars/${car.id}`)}
                            className="text-accent font-bold hover:text-accent hover:bg-accent/10"
                          >
                            Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                        <Button
                          onClick={() => handleBookNow(car)}
                          size="lg"
                          className="w-full h-14 rounded-2xl accent-gradient text-accent-foreground font-bold premium-glow group/btn"
                        >
                          <Sparkles className="w-4 h-4 mr-2" />
                          Reserve Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cars;
