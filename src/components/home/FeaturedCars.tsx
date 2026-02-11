import React from 'react';
import { Users, Fuel, Settings, Star, Heart, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useFavoritesStore } from '@/hooks/useFavoritesStore';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import MouseTilt from '@/components/ui/mouse-tilt';
import car1 from '@/assets/car-1.jpg';
import car2 from '@/assets/car-2.jpg';
import car3 from '@/assets/car-3.jpg';

const cars = [
  {
    id: 1,
    name: 'BMW 5 Series',
    category: 'Luxury Sedan',
    image: car1,
    price: 120,
    seats: 5,
    fuel: 'Petrol',
    transmission: 'Automatic',
    rating: 4.9,
    tag: 'Popular'
  },
  {
    id: 2,
    name: 'Mercedes E-Class',
    category: 'Premium Sedan',
    image: car2,
    price: 140,
    seats: 5,
    fuel: 'Petrol',
    transmission: 'Automatic',
    rating: 4.8,
    tag: 'Premium'
  },
  {
    id: 3,
    name: 'Audi Q7',
    category: 'Premium SUV',
    image: car3,
    price: 180,
    seats: 7,
    fuel: 'Diesel',
    transmission: 'Automatic',
    rating: 4.9,
    tag: 'Family'
  },
];

const FeaturedCars: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { toast } = useToast();

  const handleBookNow = (car: typeof cars[0]) => {
    toast({
      title: 'Redirecting to Booking',
      description: `Preparing to book ${car.name}...`,
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

  const handleToggleFavorite = (carId: number, carName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAdding = !isFavorite(carId);
    toggleFavorite(carId);

    toast({
      title: isAdding ? 'Added to Favorites' : 'Removed from Favorites',
      description: isAdding
        ? `${carName} has been added to your wishlist.`
        : `${carName} has been removed from your wishlist.`,
    });
  };

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 accent-gradient opacity-[0.03] blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 primary-gradient opacity-[0.03] blur-[100px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              {t('featuredCars')}<span className="text-gradient">.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the unmatched luxury and performance of our curated fleet.
              Each vehicle is meticulously maintained to ensure the highest standards of safety and comfort.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => navigate('/cars')}
              variant="outline"
              size="lg"
              className="group h-14 px-8 border-border/50 hover:bg-secondary transition-all"
            >
              Explore Full Catalog
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translateX-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MouseTilt intensity={10}>
                <Card className="group overflow-hidden rounded-[2rem] border-border/40 bg-card hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2 holographic-shine">
                  <div
                    className="relative h-72 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/cars/${car.id}`)}
                  >
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full glass-card border-white/20 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="absolute top-6 right-6">
                      <div className="glass-card px-3 py-1.5 rounded-full flex items-center gap-1.5 border-white/20">
                        <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                        <span className="text-xs font-bold text-white uppercase">{car.rating}</span>
                      </div>
                    </div>

                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 rounded-full accent-gradient text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow-lg">
                        {car.tag}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleToggleFavorite(car.id, car.name, e)}
                      className="absolute bottom-6 left-6 w-12 h-12 rounded-full glass-card border-white/20 flex items-center justify-center hover:scale-110 transition-transform shadow-xl group/fav"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${isFavorite(car.id) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                      />
                    </button>
                  </div>

                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{car.category}</p>
                        <h3 className="text-2xl font-display font-bold text-foreground group-hover:text-accent transition-colors">{car.name}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-foreground">${car.price}</p>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Per Day</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/40 mb-8">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xs font-bold text-foreground uppercase">{car.seats} Seats</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 border-x border-border/40">
                        <Fuel className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xs font-bold text-foreground uppercase">{car.fuel}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                        <span className="text-xs font-bold text-foreground uppercase">Auto</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleBookNow(car)}
                      className="w-full h-14 rounded-2xl accent-gradient text-accent-foreground font-bold premium-glow flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_10px_20px_-5px_hsla(var(--accent),0.3)]"
                    >
                      <Calendar className="w-4 h-4" />
                      Secure Booking
                    </Button>
                  </CardContent>
                </Card>
              </MouseTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
