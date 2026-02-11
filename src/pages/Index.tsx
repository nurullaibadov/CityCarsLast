import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import BrandMarquee from '@/components/home/BrandMarquee';
import FeaturedCars from '@/components/home/FeaturedCars';
import FleetSpotlight from '@/components/home/FleetSpotlight';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsSection from '@/components/home/StatsSection';
import LuxuryConcierge from '@/components/home/LuxuryConcierge';
import TestimonialsCarousel from '@/components/home/TestimonialsCarousel';
import HowItWorks from '@/components/home/HowItWorks';
import SpecialOffers from '@/components/home/SpecialOffers';
import VIPSection from '@/components/home/VIPSection';
import DashboardTeaser from '@/components/home/DashboardTeaser';
import AppShowcase from '@/components/home/AppShowcase';
import Newsletter from '@/components/home/Newsletter';
import Car360Viewer from '@/components/home/Car360Viewer';
import AIConcierge from '@/components/home/AIConcierge';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandMarquee />
      <div className="content-visibility-auto">
        <FeaturedCars />
        <Car360Viewer />
        <FleetSpotlight />
        <VIPSection />
        <StatsSection />
        <LuxuryConcierge />
        <AIConcierge />
        <WhyChooseUs />
        <HowItWorks />
        <SpecialOffers />
        <DashboardTeaser />
        <TestimonialsCarousel />
        <AppShowcase />
        <Newsletter />
      </div>
    </Layout>
  );
};

export default Index;
