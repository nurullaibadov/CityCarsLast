import React, { useState, useMemo } from 'react';
import { MapPin, Calendar, Search, Star, Shield, Clock, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-car.jpg';
import MagneticButton from '@/components/ui/magnetic-button';
import ScrollRevealText from '@/components/ui/scroll-reveal-text';
import MouseTilt from '@/components/ui/mouse-tilt';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = () => {
    if (!pickupLocation || !pickupDate || !returnDate) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields to search for cars.',
        variant: 'destructive'
      });
      return;
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast({
        title: 'Invalid Dates',
        description: 'Return date must be after pickup date.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Searching...',
      description: 'Finding the perfect car for you!',
    });

    setTimeout(() => {
      navigate('/cars');
    }, 500);
  };

  // Memoize particles for better performance
  const particles = useMemo(() => [...Array(4)].map((_, i) => ({
    id: i,
    size: 150 + Math.random() * 150,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 8 + Math.random() * 7,
  })), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Absolute Background Layer - Optimized with will-change */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none will-change-transform">
        <div className="absolute inset-0 geometric-grid opacity-20" />
        <div className="absolute inset-0 geometric-grid-fine opacity-10" />
      </div>

      {/* Background Image with Parallax & Overlay */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_hsl(var(--background))_100%)] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Floating Particles/Elements - Optimized count and will-change */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              y: [0, -40, 0],
              x: [0, 15, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full accent-gradient blur-3xl will-change-transform"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              z: 0
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-accent/20 mb-6"
            >
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">
                #1 Premium Car Rental in Azerbaijan
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight flex flex-col items-start gap-1">
              <ScrollRevealText text="Find Your Perfect" />
              <div className="flex items-center gap-4 flex-wrap">
                <span className="relative px-6 py-1 rounded-[1.5rem] border-2 border-accent/20 elite-glass-light outline-text transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <ScrollRevealText text="RIDE" />
                </span>
                <ScrollRevealText text="in Azerbaijan" className="text-gradient" />
              </div>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Experience the pinnacle of luxury travel. Whether for business or pleasure,
              our fleet of elite vehicles ensures your journey is as remarkable as the destination.
            </p>

            {/* Floating Glass Widgets for Social Proof (Desktop Only) */}
            <div className="hidden md:flex gap-6 mb-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card elite-glass p-4 rounded-2xl flex items-center gap-3"
              >
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold">Fully Insured</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card elite-glass p-4 rounded-2xl flex items-center gap-3"
              >
                <Star className="w-5 h-5 text-accent fill-accent" />
                <span className="text-sm font-semibold">5.0 Star Service</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Search Card Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <MouseTilt intensity={3}>
              <div className="glass-card elite-glass rounded-[2rem] p-8 border-accent/10 shadow-huge relative overflow-hidden group hover-glow will-change-transform">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Car className="w-32 h-32 rotate-[-20deg]" />
                </div>

                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-foreground">
                  <Search className="w-6 h-6 text-accent" />
                  Find Your Vehicle
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        Pickup Location
                      </label>
                      <Input
                        placeholder="Enter city or airport"
                        className="h-14 glass-card border-border/50 focus:border-accent"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        Return Location
                      </label>
                      <Input
                        placeholder="Enter city or airport"
                        className="h-14 glass-card border-border/50 focus:border-accent"
                        value={returnLocation}
                        onChange={(e) => setReturnLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-accent" />
                        Pickup Date
                      </label>
                      <Input
                        type="date"
                        className="h-14 glass-card border-border/50 focus:border-accent"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-accent" />
                        Return Date
                      </label>
                      <Input
                        type="date"
                        className="h-14 glass-card border-border/50 focus:border-accent"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <MagneticButton className="w-full">
                    <Button
                      onClick={handleSearch}
                      className="w-full h-16 text-lg font-bold accent-gradient text-accent-foreground premium-glow transition-all active:scale-95"
                    >
                      <Search className="w-5 h-5 mr-3" />
                      Explore Available Cars
                    </Button>
                  </MagneticButton>

                  <p className="text-center text-xs text-muted-foreground">
                    * No credit card required to browse our premium collection
                  </p>
                </div>
              </div>
            </MouseTilt>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 will-change-transform"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
