import React from 'react';
import { Car, Shield, Clock, DollarSign, ArrowUpRight, Award, Zap, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import MouseTilt from '@/components/ui/mouse-tilt';

const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Background patterns */}
      <div className="absolute inset-0 geometric-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card elite-glass-light border-accent/20 mb-6"
          >
            <Award className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-foreground/80">
              The CityCars Edge
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6"
          >
            Distinctive <span className="text-gradient">Advantages</span>.
          </motion.h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[800px]">

          {/* Main Large Feature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden h-[400px] md:h-full"
          >
            <MouseTilt intensity={3}>
              <div className="h-full w-full glass-card elite-glass p-12 flex flex-col justify-end border-border/40 relative group transition-all duration-700">
                <div className="absolute top-12 left-12 w-24 h-24 rounded-[2.5rem] accent-gradient flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                  <Car className="w-12 h-12 text-accent-foreground" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-display font-bold text-foreground mb-4">{t('premiumFleet')}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                    {t('premiumFleetDesc')}
                  </p>
                  <div className="flex items-center gap-3 text-accent font-bold uppercase tracking-widest text-sm">
                    View Fleet <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Car className="w-96 h-96 -rotate-12" />
                </div>
              </div>
            </MouseTilt>
          </motion.div>

          {/* Top Right: Prices */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 group relative h-[300px] md:h-auto"
          >
            <div className="h-full glass-card elite-glass p-8 border-border/40 hover:border-accent/40 transition-all duration-500 flex flex-col justify-between holographic-shine rounded-[2.5rem]">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-accent" />
                </div>
                <Zap className="w-6 h-6 text-muted-foreground/30" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">{t('bestPrices')}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{t('bestPricesDesc')}</p>
              </div>
            </div>
          </motion.div>

          {/* Bottom Middle: Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative h-[300px] md:h-auto"
          >
            <div className="h-full glass-card elite-glass p-8 border-border/40 hover:border-accent/40 transition-all duration-500 flex flex-col items-center text-center justify-center holographic-shine rounded-[2.5rem]">
              <div className="w-20 h-20 mb-6 rounded-full accent-gradient-soft flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{t('support247')}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{t('support247Desc')}</p>
            </div>
          </motion.div>

          {/* Bottom Right: Drivers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative h-[300px] md:h-auto"
          >
            <div className="h-full glass-card p-8 border-border/40 hover:border-accent/40 transition-all duration-500 flex flex-col justify-between bg-accent text-accent-foreground rounded-[2.5rem] shadow-huge">
              <Shield className="w-12 h-12 text-accent-foreground/50" />
              <div>
                <h3 className="text-2xl font-display font-bold mb-2">{t('professionalDrivers')}</h3>
                <div className="flex -space-x-3 mb-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-accent bg-secondary/20 flex items-center justify-center text-[10px] font-bold">
                      <Heart className="w-3 h-3 fill-current" />
                    </div>
                  ))}
                </div>
                <p className="text-accent-foreground/80 text-xs">{t('professionalDriversDesc')}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
