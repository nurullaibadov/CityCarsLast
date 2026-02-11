import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';
import AIChatAssistant from '@/components/shared/AIChatAssistant';
import LiveBookingTicker from '@/components/shared/LiveBookingTicker';
import FloatingActionButton from '@/components/shared/FloatingActionButton';
import NotificationBanner from '@/components/shared/NotificationBanner';
import CookieConsent from '@/components/shared/CookieConsent';
import PremiumEffects from '@/components/shared/PremiumEffects';
import AnimatedBackground from '@/components/shared/AnimatedBackground';
import BakuContextWidget from '@/components/shared/BakuContextWidget';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <PremiumEffects />
      <Header />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <AIChatAssistant />
      <LiveBookingTicker />
      <FloatingActionButton />
      <NotificationBanner />
      <CookieConsent />
    </div>
  );
};

export default Layout;
