import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, label: 'Twitter' },
    { icon: <Youtube className="w-5 h-5" />, label: 'Youtube' },
  ];

  const quickLinks = [
    { path: '/', label: t('home') },
    { path: '/cars', label: t('cars') },
    { path: '/drivers', label: t('drivers') },
    { path: '/transfer', label: t('transfer') },
    { path: '/news', label: t('news') },
  ];

  return (
    <footer className="bg-background relative overflow-hidden pt-24 pb-12">
      {/* Decorative Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-border/40 pb-20">

          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={logo} alt="CityCars Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold text-foreground leading-none">
                  City<span className="text-accent">Cars</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold opacity-80">Azerbaijan</span>
              </div>
            </Link>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
              Defining the standard for luxury mobility in Azerbaijan. Experience
              unparalleled service and a world-class fleet.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-2xl glass-card border-border/50 flex items-center justify-center hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Discovery</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-muted-foreground text-sm hover:text-accent flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Luxury Services</h4>
            <ul className="space-y-4">
              {['Airport Elite', 'Chauffeur Vetted', 'Corporate Protocol', 'Event Logistics'].map((service, i) => (
                <li key={i} className="text-muted-foreground text-sm hover:text-accent cursor-pointer flex items-center gap-2 group transition-colors">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Contact Excellence</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl glass-card border-accent/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Global HQ</p>
                  <p className="text-sm text-foreground">28 May Street, Baku, Azerbaijan</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl glass-card border-accent/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">24/7 Concierge</p>
                  <a href="tel:+994501234567" className="text-sm text-foreground hover:text-accent transition-colors">+994 50 123 45 67</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl glass-card border-accent/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Inquiries</p>
                  <a href="mailto:info@citycars.az" className="text-sm text-foreground hover:text-accent transition-colors">info@citycars.az</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Final Bits */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <p>© {new Date().getFullYear()} CityCars Azerbaijan. Crafted for the Elite.</p>
          <div className="flex gap-8">
            <span className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-accent cursor-pointer transition-colors">Ethics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
