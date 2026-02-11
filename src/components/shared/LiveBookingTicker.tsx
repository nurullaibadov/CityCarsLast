import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin } from 'lucide-react';

const bookings = [
    { name: "Ahmed", city: "Baku", car: "BMW M4 Competition" },
    { name: "John", city: "Ganja", car: "Mercedes-Benz G63" },
    { name: "Leyla", city: "Baku", car: "Range Rover Sport" },
    { name: "David", city: "Sumqayit", car: "Audi RS6 Avant" },
    { name: "Sarah", city: "Quba", car: "Porsche Cayenne" },
    { name: "Murad", city: "Baku", car: "Tesla Model S Plaid" }
];

const LiveBookingTicker: React.FC = () => {
    const [currentBooking, setCurrentBooking] = useState<typeof bookings[0] | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const showNotification = () => {
            const randomIndex = Math.floor(Math.random() * bookings.length);
            setCurrentBooking(bookings[randomIndex]);
            setIsVisible(true);

            // Hide after 5 seconds
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        };

        // Initial delay
        const initialTimeout = setTimeout(showNotification, 8000);

        // Set interval for subsequent notifications
        const interval = setInterval(() => {
            showNotification();
        }, 25000); // Show every 25 seconds

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="fixed bottom-8 left-8 z-[60] pointer-events-none">
            <AnimatePresence>
                {isVisible && currentBooking && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        className="glass-card p-4 rounded-2xl border-accent/20 flex items-center gap-4 shadow-2xl pointer-events-auto max-w-xs"
                    >
                        <div className="w-12 h-12 rounded-full accent-gradient flex items-center justify-center flex-shrink-0 animate-pulse-slow">
                            <CheckCircle className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground leading-tight">
                                {currentBooking.name} recently booked
                            </p>
                            <p className="text-xs text-accent font-semibold mb-1">
                                {currentBooking.car}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{currentBooking.city}, Azerbaijan</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveBookingTicker;
